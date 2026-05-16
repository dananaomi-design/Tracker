import { useState, useEffect } from "react";

const PILLARS = [
  { id: "producir",  label: "Producir",   icon: "💼", grad: "linear-gradient(135deg,#A8C5A0,#6B9E7A)" },
  { id: "crear",     label: "Crear",      icon: "🎨", grad: "linear-gradient(135deg,#F5C842,#F0A500)" },
  { id: "entrenar",  label: "Entrenar",   icon: "🏋️‍♀️", grad: "linear-gradient(135deg,#E8896A,#C4714A)" },
  { id: "cami",      label: "Cami",       icon: "👶", grad: "linear-gradient(135deg,#B8A9E8,#8B7EC8)" },
  { id: "selfcare",  label: "Selfcare",   icon: "🧘", grad: "linear-gradient(135deg,#F0A8C0,#D4607A)" },
  { id: "goodfood",  label: "Good food",  icon: "🥗", grad: "linear-gradient(135deg,#A8E6CF,#4A9E7A)" },

];

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAYS_ES = ["D","L","M","M","J","V","S"];
const TOTAL = PILLARS.length;

function getDaysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }
function getFirstDayOfMonth(y,m){ return new Date(y,m,1).getDay(); }
function todayKey(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function dateKey(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
function getWeekDays(date){
  const d=new Date(date); const day=d.getDay();
  const mon=new Date(d); mon.setDate(d.getDate()-day+1);
  return Array.from({length:7},(_,i)=>{ const x=new Date(mon); x.setDate(mon.getDate()+i); return dateKey(x.getFullYear(),x.getMonth(),x.getDate()); });
}
function getYearDays(year){
  const days=[];
  for(let m=0;m<12;m++){ const n=getDaysInMonth(year,m); for(let d=1;d<=n;d++) days.push(dateKey(year,m,d)); }
  return days;
}

export default function Tracker() {
  const now = new Date();
  const [data, setData] = useState({});
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(todayKey());
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState("day");
  const [histoPeriod, setHistoPeriod] = useState("month");

  useEffect(() => {
    try { const v=localStorage.getItem("tracker-data"); if(v) setData(JSON.parse(v)); } catch{}
  }, []);

  function save(d){ setSaving(true); try{ localStorage.setItem("tracker-data",JSON.stringify(d)); }catch{} setTimeout(()=>setSaving(false),800); }

  function togglePillar(dk,pid){
    const dd=data[dk]||{pillars:{},note:""};
    const np={...dd.pillars,[pid]:!dd.pillars[pid]};
    const nd={...data,[dk]:{...dd,pillars:np}};
    setData(nd); save(nd);
  }
  function saveNote(dk,text){
    const dd=data[dk]||{pillars:{},note:""};
    const nd={...data,[dk]:{...dd,note:text}};
    setData(nd); save(nd);
  }
  function getDayScore(dk){ const d=data[dk]; if(!d) return 0; return PILLARS.filter(p=>d.pillars?.[p.id]).length; }
  function getPillarCount(days,pid){ return days.filter(k=>data[k]?.pillars?.[pid]).length; }

  function exportBackup(){
    const b=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const u=URL.createObjectURL(b); const a=document.createElement("a");
    a.href=u; a.download=`tracker-backup-${todayKey()}.json`; a.click(); URL.revokeObjectURL(u);
  }
  function importBackup(e){
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader(); r.onload=ev=>{ try{ const p=JSON.parse(ev.target.result); setData(p); localStorage.setItem("tracker-data",JSON.stringify(p)); alert("✓ Backup restaurado"); }catch{ alert("Error al leer"); } }; r.readAsText(f);
  }

  const today = todayKey();
  const selectedData = data[selectedDay]||{pillars:{},note:""};
  const selectedScore = getDayScore(selectedDay);
  const daysInMonth = getDaysInMonth(viewYear,viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear,viewMonth);
  const monthDays = Array.from({length:daysInMonth},(_,i)=>dateKey(viewYear,viewMonth,i+1));
  const activeDays = monthDays.filter(k=>getDayScore(k)>0).length;
  const totalDaysSoFar = now.getMonth()===viewMonth&&now.getFullYear()===viewYear ? now.getDate() : daysInMonth;
  const consistencia = Math.round((activeDays/totalDaysSoFar)*100)||0;
  const perfectDays = monthDays.filter(k=>getDayScore(k)===TOTAL).length;

  const histoDays = histoPeriod==="week" ? getWeekDays(today)
    : histoPeriod==="month" ? Array.from({length:getDaysInMonth(now.getFullYear(),now.getMonth())},(_,i)=>dateKey(now.getFullYear(),now.getMonth(),i+1))
    : getYearDays(now.getFullYear());
  const histoTotal = histoDays.length;
  const histoActive = histoDays.filter(k=>getDayScore(k)>0).length;
  const sortedPillars = [...PILLARS].map(p=>({...p,count:getPillarCount(histoDays,p.id)})).sort((a,b)=>b.count-a.count);

  const scoreMessages=["¿Qué lograste hoy?","Empezaste.\nEso cuenta.","Buen\navance.","Mitad\nlograda ✓","Casi\ncompleto 🔥","Día\ncompleto ✦","Día\nbrillante 🌟"];

  return (
    <div style={{minHeight:"100vh",background:"#F7F7F5",fontFamily:"'DM Sans','Helvetica Neue',sans-serif",color:"#1A1A1A"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Outfit:wght@700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .pc{border-radius:20px;padding:16px 14px;cursor:pointer;transition:transform 0.15s;border:none;outline:none;text-align:left;width:100%;}
        .pc:active{transform:scale(0.95);}
        .pc.off{background:#EEECEA!important;}
        .dc{border-radius:10px;cursor:pointer;transition:transform 0.1s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;aspect-ratio:1;}
        .dc:active{transform:scale(0.88);}
        .tab{flex:1;padding:14px 0;border:none;background:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;color:#AEAEAD;transition:color 0.2s;border-bottom:2px solid transparent;}
        .tab.active{color:#1A1A1A;border-bottom:2px solid #1A1A1A;}
        textarea{width:100%;border:none;background:#EEECEA;border-radius:18px;padding:16px 18px;font-family:'DM Sans',sans-serif;font-size:14px;color:#1A1A1A;resize:none;outline:none;line-height:1.65;}
        textarea::placeholder{color:#AEAEAD;}
        .nb{background:none;border:2px solid #E5E3E0;border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;color:#1A1A1A;}
        .hp{display:flex;gap:6px;margin-bottom:20px;}
        .hp button{flex:1;padding:8px 0;border:1.5px solid #E5E3E0;border-radius:20px;background:none;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;color:#AEAEAD;transition:all 0.2s;}
        .hp button.active{background:#1A1A1A;color:#fff;border-color:#1A1A1A;}
      `}</style>

      {/* HEADER */}
      <div style={{padding:"52px 22px 20px",background:"#fff"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:3,color:"#AEAEAD",textTransform:"uppercase",marginBottom:8}}>Dana Naomi — keep going.</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:44,fontWeight:800,lineHeight:1}}>
            Mi<br/><span style={{background:"linear-gradient(120deg,#E8896A,#F5C842)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>progreso</span>
          </div>
          <div style={{fontSize:11,color:saving?"#E8896A":"#AEAEAD",fontWeight:600}}>{saving?"guardando…":MONTHS[now.getMonth()]}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <div style={{background:"linear-gradient(135deg,#1A1A1A,#3C3C3C)",borderRadius:18,padding:"14px 12px"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:32,fontWeight:800,color:"#fff",lineHeight:1}}>{activeDays}</div>
            <div style={{fontSize:10,color:"#888",marginTop:4,fontWeight:600}}>activos</div>
          </div>
          <div style={{background:"linear-gradient(135deg,#F5C842,#F0A500)",borderRadius:18,padding:"14px 12px"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:32,fontWeight:800,color:"#fff",lineHeight:1}}>{perfectDays}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.75)",marginTop:4,fontWeight:600}}>completos</div>
          </div>
          <div style={{background:"linear-gradient(135deg,#B8A9E8,#8B7EC8)",borderRadius:18,padding:"14px 12px"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:32,fontWeight:800,color:"#fff",lineHeight:1}}>{consistencia}%</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.75)",marginTop:4,fontWeight:600}}>racha</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1.5px solid #F0EFED",position:"sticky",top:0,zIndex:20}}>
        {[["day","Hoy"],["calendar","Calendario"],["historico","Histórico"]].map(([t,l])=>(
          <button key={t} className={`tab ${view===t?"active":""}`} onClick={()=>setView(t)}>{l}</button>
        ))}
      </div>

      {/* DAY VIEW */}
      {view==="day"&&(
        <div style={{padding:"24px 20px 40px",maxWidth:480,margin:"0 auto"}}>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"#AEAEAD",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>
              {selectedDay===today?"Hoy":selectedDay}
            </div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,lineHeight:1.15,whiteSpace:"pre-line"}}>
              {scoreMessages[Math.min(selectedScore,scoreMessages.length-1)]}
            </div>
          </div>

          <div style={{marginBottom:22}}>
            <div style={{height:7,background:"#EEECEA",borderRadius:10,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${(selectedScore/TOTAL)*100}%`,background:"linear-gradient(to right,#E8896A,#F5C842)",borderRadius:10,transition:"width 0.4s cubic-bezier(.34,1.56,.64,1)"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:5}}>
              <span style={{fontSize:12,fontWeight:700,color:"#AEAEAD"}}>{selectedScore}/{TOTAL}</span>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:22}}>
            {PILLARS.map(p=>{
              const active=!!selectedData.pillars?.[p.id];
              return(
                <button key={p.id} className={`pc ${active?"":"off"}`} onClick={()=>togglePillar(selectedDay,p.id)}
                  style={{background:active?p.grad:undefined,minHeight:110}}>
                  <span style={{fontSize:28,display:"block",marginBottom:8,opacity:active?1:0.3}}>{p.icon}</span>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:800,color:active?"#fff":"#AEAEAD",lineHeight:1.1,marginBottom:3}}>{p.label}</div>
                  {active&&<div style={{fontSize:10,color:"rgba(255,255,255,0.75)",fontWeight:600}}>✓ logrado</div>}
                </button>
              );
            })}
          </div>

          <div style={{fontSize:11,fontWeight:700,color:"#AEAEAD",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Nota del día</div>
          <textarea rows={3} placeholder="¿Cómo te sentiste? ¿Qué celebras hoy?"
            value={selectedData.note||""}
            onChange={e=>{ const v=e.target.value; const dd=data[selectedDay]||{pillars:{},note:""}; setData(prev=>({...prev,[selectedDay]:{...dd,note:v}})); }}
            onBlur={e=>saveNote(selectedDay,e.target.value)}/>
        </div>
      )}

      {/* CALENDAR VIEW */}
      {view==="calendar"&&(
        <div style={{padding:"24px 20px 40px",maxWidth:480,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <button className="nb" onClick={()=>{ if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); }}>←</button>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800}}>{MONTHS[viewMonth]} {viewYear}</div>
            <button className="nb" onClick={()=>{ if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); }}>→</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:8}}>
            {DAYS_ES.map((d,i)=><div key={i} style={{textAlign:"center",fontSize:11,fontWeight:700,color:"#AEAEAD"}}>{d}</div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
            {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
            {Array.from({length:daysInMonth},(_,i)=>{
              const day=i+1; const key=dateKey(viewYear,viewMonth,day);
              const isToday=key===today; const isSel=key===selectedDay;
              const score=getDayScore(key); const ratio=score/TOTAL;
              const bg=isSel?"linear-gradient(135deg,#1A1A1A,#3C3C3C)"
                :score===0?"#F0EFED"
                :ratio<=0.3?"linear-gradient(135deg,#f5e8e2,#edc4b5)"
                :ratio<=0.6?"linear-gradient(135deg,#fef0c0,#f5c842)"
                :ratio<=0.85?"linear-gradient(135deg,#E8896A,#C4714A)"
                :"linear-gradient(135deg,#1A1A1A,#3C3C3C)";
              return(
                <div key={day} className="dc" onClick={()=>{setSelectedDay(key);setView("day");}}
                  style={{background:bg,outline:isToday&&!isSel?"2.5px solid #E8896A":"none"}}>
                  <div style={{fontSize:12,fontWeight:700,color:isSel||ratio>0.6?"#fff":"#1A1A1A"}}>{day}</div>
                  {score>0&&<div style={{display:"flex",gap:2,flexWrap:"wrap",justifyContent:"center",maxWidth:28}}>
                    {Array.from({length:Math.min(score,5)}).map((_,i)=>(
                      <div key={i} style={{width:3,height:3,borderRadius:"50%",background:isSel||ratio>0.6?"rgba(255,255,255,0.7)":"#C4714A"}}/>
                    ))}
                  </div>}
                </div>
              );
            })}
          </div>
          <div style={{marginTop:26}}>
            <div style={{fontSize:11,fontWeight:700,color:"#AEAEAD",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Este mes</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {PILLARS.map(p=>{
                const count=getPillarCount(monthDays,p.id);
                return(
                  <div key={p.id} style={{background:p.grad,borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:22}}>{p.icon}</span>
                    <div>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:"#fff",lineHeight:1}}>{count}×</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.75)",fontWeight:600,marginTop:2}}>{p.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{marginTop:28,paddingTop:22,borderTop:"1.5px solid #F0EFED"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#AEAEAD",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Mis datos</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={exportBackup} style={{background:"linear-gradient(135deg,#1A1A1A,#3C3C3C)",border:"none",borderRadius:14,padding:"14px 12px",cursor:"pointer",textAlign:"left"}}>
                <div style={{fontSize:20,marginBottom:6}}>💾</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:800,color:"#fff"}}>Exportar</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",marginTop:3}}>backup .json</div>
              </button>
              <label style={{background:"#EEECEA",borderRadius:14,padding:"14px 12px",cursor:"pointer",display:"block"}}>
                <div style={{fontSize:20,marginBottom:6}}>📂</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:800,color:"#1A1A1A"}}>Restaurar</div>
                <div style={{fontSize:10,color:"#AEAEAD",marginTop:3}}>subir backup</div>
                <input type="file" accept=".json" onChange={importBackup} style={{display:"none"}}/>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* HISTÓRICO VIEW */}
      {view==="historico"&&(
        <div style={{padding:"24px 20px 40px",maxWidth:480,margin:"0 auto"}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,marginBottom:20}}>
            Tu <span style={{background:"linear-gradient(120deg,#E8896A,#F5C842)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>historia</span>
          </div>
          <div className="hp">
            {[["week","Esta semana"],["month","Este mes"],["year","Este año"]].map(([k,l])=>(
              <button key={k} className={histoPeriod===k?"active":""} onClick={()=>setHistoPeriod(k)}>{l}</button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
            <div style={{background:"linear-gradient(135deg,#1A1A1A,#3C3C3C)",borderRadius:18,padding:"18px 16px"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:38,fontWeight:800,color:"#fff",lineHeight:1}}>{histoActive}</div>
              <div style={{fontSize:11,color:"#888",marginTop:5,fontWeight:600}}>días activos</div>
              <div style={{fontSize:10,color:"#666",marginTop:2}}>de {histoTotal} totales</div>
            </div>
            <div style={{background:"linear-gradient(135deg,#F5C842,#F0A500)",borderRadius:18,padding:"18px 16px"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:38,fontWeight:800,color:"#fff",lineHeight:1}}>
                {Math.round((histoActive/histoTotal)*100)||0}%
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.8)",marginTop:5,fontWeight:600}}>consistencia</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",marginTop:2}}>{histoPeriod==="week"?"7 días":histoPeriod==="month"?"este mes":"este año"}</div>
            </div>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:"#AEAEAD",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Ranking de pilares</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {sortedPillars.map((p,i)=>{
              const pct=histoTotal>0?Math.round((p.count/histoTotal)*100):0;
              return(
                <div key={p.id} style={{background:"#fff",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14}}>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:"#AEAEAD",minWidth:24,textAlign:"center"}}>{i+1}</div>
                  <span style={{fontSize:24}}>{p.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:800}}>{p.label}</div>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:800}}>{p.count}×</div>
                    </div>
                    <div style={{height:5,background:"#EEECEA",borderRadius:10,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${pct}%`,background:p.grad,borderRadius:10,transition:"width 0.6s ease"}}/>
                    </div>
                  </div>
                  <div style={{fontSize:11,fontWeight:700,color:"#AEAEAD",minWidth:32,textAlign:"right"}}>{pct}%</div>
                </div>
              );
            })}
          </div>
          {(()=>{
            let best=0,cur=0;
            [...histoDays].sort().forEach(k=>{ if(getDayScore(k)>0){cur++;best=Math.max(best,cur);}else cur=0; });
            return best>0?(
              <div style={{marginTop:24,background:"linear-gradient(135deg,#B8A9E8,#8B7EC8)",borderRadius:18,padding:"18px 20px",display:"flex",alignItems:"center",gap:16}}>
                <div style={{fontSize:32}}>🔥</div>
                <div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,color:"#fff",lineHeight:1}}>{best} días</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:4,fontWeight:600}}>mejor racha en {histoPeriod==="week"?"la semana":histoPeriod==="month"?"el mes":"el año"}</div>
                </div>
              </div>
            ):null;
          })()}
        </div>
      )}
    </div>
  );
}
