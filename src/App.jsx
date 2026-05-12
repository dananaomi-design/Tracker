import { useState, useEffect } from "react";

const PILLARS = [
  { id: "producir", label: "Producir", icon: "💼", grad: "linear-gradient(135deg, #A8C5A0 0%, #6B9E7A 100%)", text: "#fff" },
  { id: "crear", label: "Crear", icon: "🎨", grad: "linear-gradient(135deg, #F5C842 0%, #F0A500 100%)", text: "#fff" },
  { id: "entrenar", label: "Entrenar", icon: "🏋️‍♀️", grad: "linear-gradient(135deg, #E8896A 0%, #C4714A 100%)", text: "#fff" },
  { id: "cami", label: "Cami", icon: "👶", grad: "linear-gradient(135deg, #B8A9E8 0%, #8B7EC8 100%)", text: "#fff" },
];

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAYS_ES = ["D","L","M","M","J","V","S"];

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay(); }
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function dateKey(year, month, day) {
  return `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

export default function Tracker() {
  const now = new Date();
  const [data, setData] = useState({});
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(todayKey());
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState("day");

  useEffect(() => {
    async function load() {
      try {
        const result = { value: localStorage.getItem("tracker-data") };
        if (result?.value) setData(JSON.parse(result.value));
      } catch {}
    }
    load();
  }, []);

  function save(newData) {
    setSaving(true);
    try { localStorage.setItem("tracker-data", JSON.stringify(newData)); } catch {}
    setTimeout(() => setSaving(false), 800);
  }

  function togglePillar(dayKey, pillarId) {
    const dayData = data[dayKey] || { pillars: {}, note: "" };
    const newPillars = { ...dayData.pillars, [pillarId]: !dayData.pillars[pillarId] };
    const newData = { ...data, [dayKey]: { ...dayData, pillars: newPillars } };
    setData(newData);
    save(newData);
  }

  function saveNote(dayKey, text) {
    const dayData = data[dayKey] || { pillars: {}, note: "" };
    const newData = { ...data, [dayKey]: { ...dayData, note: text } };
    setData(newData);
    save(newData);
  }

  function getDayScore(dayKey) {
    const d = data[dayKey];
    if (!d) return 0;
    return PILLARS.filter(p => d.pillars?.[p.id]).length;
  }

  const today = todayKey();
  const selectedData = data[selectedDay] || { pillars: {}, note: "" };
  const selectedScore = getDayScore(selectedDay);
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const monthDays = Array.from({length: daysInMonth}, (_, i) => dateKey(viewYear, viewMonth, i+1));
  const activeDays = monthDays.filter(k => getDayScore(k) > 0).length;
  const perfectDays = monthDays.filter(k => getDayScore(k) === 4).length;
  const totalDaysSoFar = now.getMonth() === viewMonth && now.getFullYear() === viewYear ? now.getDate() : daysInMonth;
  const consistencia = Math.round((activeDays / totalDaysSoFar) * 100) || 0;

  const scoreMessages = ["¿Qué lograste hoy?", "Empezaste.\nEso cuenta.", "Buen\navance.", "Casi\ncompleto 🔥", "Día\ncompleto ✦"];

  return (
    <div style={{ minHeight: "100vh", background: "#F7F7F5", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1A1A1A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pillar-card {
          border-radius: 22px;
          padding: 20px 18px 18px;
          cursor: pointer;
          transition: transform 0.15s ease;
          border: none;
          outline: none;
          text-align: left;
          width: 100%;
        }
        .pillar-card:active { transform: scale(0.95); }
        .pillar-card.off { background: #EEECEA !important; }

        .day-cell {
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.1s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          aspect-ratio: 1;
        }
        .day-cell:active { transform: scale(0.88); }

        .tab { flex:1; padding:14px 0; border:none; background:none; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; cursor:pointer; color:#AEAEAD; transition:color 0.2s; }
        .tab.active { color:#1A1A1A; }

        textarea { width:100%; border:none; background:#EEECEA; border-radius:18px; padding:16px 18px; font-family:'DM Sans',sans-serif; font-size:14px; color:#1A1A1A; resize:none; outline:none; line-height:1.65; }
        textarea::placeholder { color:#AEAEAD; }

        .nav-btn { background:none; border:2px solid #E5E3E0; border-radius:50%; width:38px; height:38px; cursor:pointer; font-size:15px; display:flex; align-items:center; justify-content:center; color:#1A1A1A; transition:background 0.15s; }
        .nav-btn:hover { background:#EEECEA; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ padding: "52px 22px 22px", background: "#fff" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#AEAEAD", textTransform: "uppercase", marginBottom: 8 }}>
          Regreso al Yo
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 22 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 46, fontWeight: 800, lineHeight: 1 }}>
            Mi<br />
            <span style={{ background: "linear-gradient(120deg, #E8896A 0%, #F5C842 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              progreso
            </span>
          </div>
          <div style={{ fontSize: 11, color: saving ? "#E8896A" : "#AEAEAD", fontWeight: 600, transition: "color 0.3s" }}>
            {saving ? "guardando…" : MONTHS[now.getMonth()]}
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #3C3C3C 100%)", borderRadius: 18, padding: "16px 14px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{activeDays}</div>
            <div style={{ fontSize: 10, color: "#888", marginTop: 5, fontWeight: 600 }}>activos</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #F5C842 0%, #F0A500 100%)", borderRadius: 18, padding: "16px 14px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{perfectDays}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginTop: 5, fontWeight: 600 }}>completos</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #B8A9E8 0%, #8B7EC8 100%)", borderRadius: 18, padding: "16px 14px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{consistencia}%</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginTop: 5, fontWeight: 600 }}>racha</div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1.5px solid #F0EFED", position: "sticky", top: 0, zIndex: 20 }}>
        <button className={`tab ${view === "day" ? "active" : ""}`} onClick={() => setView("day")}>Hoy</button>
        <button className={`tab ${view === "calendar" ? "active" : ""}`} onClick={() => setView("calendar")}>Calendario</button>
      </div>

      {/* ── DAY VIEW ── */}
      {view === "day" && (
        <div style={{ padding: "26px 20px 40px", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#AEAEAD", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              {selectedDay === today ? "Hoy" : selectedDay}
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1.15, whiteSpace: "pre-line" }}>
              {scoreMessages[selectedScore]}
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: 26 }}>
            <div style={{ height: 7, background: "#EEECEA", borderRadius: 10, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(selectedScore / 4) * 100}%`,
                background: "linear-gradient(to right, #E8896A, #F5C842)",
                borderRadius: 10,
                transition: "width 0.4s cubic-bezier(.34,1.56,.64,1)",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#AEAEAD" }}>{selectedScore}/4</span>
            </div>
          </div>

          {/* Pillars 2×2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {PILLARS.map(p => {
              const active = !!selectedData.pillars?.[p.id];
              return (
                <button
                  key={p.id}
                  className={`pillar-card ${active ? "" : "off"}`}
                  onClick={() => togglePillar(selectedDay, p.id)}
                  style={{ background: active ? p.grad : undefined, minHeight: 140 }}
                >
                  <span style={{ fontSize: 34, display: "block", marginBottom: 10, opacity: active ? 1 : 0.3 }}>{p.icon}</span>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 22,
                    fontWeight: 800,
                    color: active ? "#fff" : "#AEAEAD",
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}>{p.label}</div>
                  {active && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>✓ logrado</div>}
                </button>
              );
            })}
          </div>

          {/* Note */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#AEAEAD", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
            Nota del día
          </div>
          <textarea
            rows={4}
            placeholder="¿Cómo te sentiste? ¿Qué celebras hoy?"
            value={selectedData.note || ""}
            onChange={e => {
              const val = e.target.value;
              const dayData = data[selectedDay] || { pillars: {}, note: "" };
              setData(prev => ({ ...prev, [selectedDay]: { ...dayData, note: val } }));
            }}
            onBlur={e => saveNote(selectedDay, e.target.value)}
          />
        </div>
      )}

      {/* ── CALENDAR VIEW ── */}
      {view === "calendar" && (
        <div style={{ padding: "26px 20px 40px", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <button className="nav-btn" onClick={() => {
              if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); } else setViewMonth(m => m-1);
            }}>←</button>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>
              {MONTHS[viewMonth]} {viewYear}
            </div>
            <button className="nav-btn" onClick={() => {
              if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1); } else setViewMonth(m => m+1);
            }}>→</button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
            {DAYS_ES.map((d, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#AEAEAD" }}>{d}</div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
            {Array.from({length: firstDay}).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({length: daysInMonth}, (_, i) => {
              const day = i + 1;
              const key = dateKey(viewYear, viewMonth, day);
              const isToday = key === today;
              const isSelected = key === selectedDay;
              const score = getDayScore(key);
              const bgs = [
                "#F0EFED",
                "linear-gradient(135deg,#f5e8e2,#edc4b5)",
                "linear-gradient(135deg,#fef0c0,#f5c842)",
                "linear-gradient(135deg,#E8896A,#C4714A)",
                "linear-gradient(135deg,#1A1A1A,#3C3C3C)",
              ];
              return (
                <div
                  key={day}
                  className="day-cell"
                  onClick={() => { setSelectedDay(key); setView("day"); }}
                  style={{
                    background: isSelected ? "linear-gradient(135deg,#1A1A1A,#3C3C3C)" : bgs[score],
                    outline: isToday && !isSelected ? "2.5px solid #E8896A" : "none",
                    outlineOffset: "0px",
                  }}
                >
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: isSelected ? "#fff" : score >= 3 ? "#fff" : "#1A1A1A",
                  }}>{day}</div>
                  {score > 0 && (
                    <div style={{ display: "flex", gap: 2 }}>
                      {Array.from({length: score}).map((_, i) => (
                        <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: isSelected || score >= 3 ? "rgba(255,255,255,0.7)" : "#C4714A" }} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Monthly pillar counts */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#AEAEAD", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
              Este mes
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {PILLARS.map(p => {
                const count = monthDays.filter(k => data[k]?.pillars?.[p.id]).length;
                return (
                  <div key={p.id} style={{ background: p.grad, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{count}×</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, marginTop: 2 }}>{p.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
