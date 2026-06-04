import { useState } from "react";

// ─── ICONS (SVG lineal, 20×20) ───────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.6 }) => {
  const paths = {
    home:      <><path d="M3 9.5L10 3l7 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M7 20v-7h6v7"/></>,
    dumbbell:  <><path d="M6 5.5v13M18 5.5v13M2 8.5h4M18 8.5h4M2 15.5h4M18 15.5h4M6 9h12v6H6z"/></>,
    check:     <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-5"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M12 12v.01M2 12h20"/></>,
    zap:       <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    pill:      <><path d="M10.5 3.5a5 5 0 017.07 7.07l-7.5 7.5a5 5 0 01-7.07-7.07l7.5-7.5z"/><line x1="8" y1="8" x2="16" y2="16"/></>,
    person:    <><circle cx="12" cy="7" r="3"/><path d="M5 20a7 7 0 0114 0"/></>,
    arrow:     <><path d="M5 12h14M12 5l7 7-7 7"/></>,
    circle:    <><circle cx="12" cy="12" r="9"/></>,
    target:    <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="5"/></>,
    pen:       <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
    eye:       <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    chevron:   <><path d="M9 18l6-6-6-6"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const DAYS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
const dow = new Date().getDay();
const todayIdx = dow === 0 ? 6 : dow - 1;

// ─── GREETINGS ───────────────────────────────────────────────────────────────
const hour = new Date().getHours();
const timePrefix = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
const DAY_GREET = ["Lunes de arranque,","Martes con todo,","Miércoles al centro,","Jueves casi,","Viernes ganado,","Sábado libre,","Domingo recarga,"];

const GREETINGS = [
  { line1: timePrefix + ",",    line2: "Dana" },
  { line1: timePrefix + ",",    line2: "Samurai" },
  { line1: DAY_GREET[todayIdx], line2: "Dana" },
  { line1: timePrefix + ",",    line2: "Dana" },
  { line1: "Hola,",             line2: "Onna-bugeisha" },  // ~mitad guerreros en batallas japonesas
  { line1: timePrefix + ",",    line2: "Dana" },
  { line1: "Hola,",             line2: "Pionera" },         // Marie Curie, 2 Nobels en ciencias distintas
  { line1: DAY_GREET[todayIdx], line2: "Samurai" },
  { line1: "Hola,",             line2: "Arquitecta" },      // Zaha Hadid, primera mujer Pritzker
  { line1: timePrefix + ",",    line2: "Dana" },
  { line1: "Hola,",             line2: "Estratega" },       // Ada Lovelace, primer algoritmo de la historia
  { line1: timePrefix + ",",    line2: "Samurai" },
  { line1: "Hola,",             line2: "Visionaria" },      // Hedy Lamarr inventó la base del wifi
  { line1: DAY_GREET[todayIdx], line2: "Dana" },
  { line1: "Bienvenida,",       line2: "Dana" },
];

// Cambia por día (estable mientras dure el día)
const greetSeed = new Date().getDate() + new Date().getMonth() * 31;
const greeting = GREETINGS[greetSeed % GREETINGS.length];

const HABITS = [
  { id: "ejercicio",   label: "Ejercicio",      icon: "dumbbell",  color: "#AC4DE2" },
  { id: "portafolio",  label: "Portafolio 2h",  icon: "briefcase", color: "#A166CE" },
  { id: "prospeccion", label: "Prospección 1h", icon: "target",    color: "#C4FC7B" },
  { id: "camille",     label: "Camille",         icon: "circle",    color: "#AC4DE2" },
  { id: "arte",        label: "Arte",            icon: "pen",       color: "#A166CE" },
];

const ROUTINE = [
  {
    block: "Tren Inferior + Core", tag: "Cadena posterior · Glúteo · Core profundo",
    duration: "60 min", color: "#EAEAEA",
    img: "/img-tren-inferior-core.png",
    focus: "El mayor músculo está en las piernas. Activarlo redistribuye la grasa y acelera el metabolismo.",
    exercises: [
      { name: "Romanian Deadlift",        detail: "Mancuernas · 4 × 12",           target: "Cadena posterior" },
      { name: "Sumo Squat (tempo 3-1-1)", detail: "Mancuerna · 4 × 15",            target: "Glúteo y aductor" },
      { name: "Hip Thrust unilateral",    detail: "Con banda · 3 × 15 c/lado",     target: "Glúteo mayor" },
      { name: "Step-up lateral",          detail: "Mancuerna · 3 × 12",            target: "Estabilidad y glúteo" },
      { name: "Dead Bug",                 detail: "3 × 10 lentos",                  target: "Core profundo" },
      { name: "Pallof Press",             detail: "Banda · 3 × 12",                target: "Anti-rotación" },
    ],
  },
  {
    block: "Espalda + Postura", tag: "Romboides · Trapecio medio · Dorsal",
    duration: "55 min", color: "#C4FC7B",
    img: "/img-espalda-postura.png",
    focus: "Activar romboides y trapecio medio abre el pecho, alarga el cuello y mejora la postura desde la raíz.",
    exercises: [
      { name: "Remo en pronación",          detail: "Mancuernas · 4 × 15 · codos abiertos", target: "Romboides" },
      { name: "Face Pull",                  detail: "Banda · 4 × 20 · codos altos",          target: "Trapecio medio" },
      { name: "Pull-apart con banda",       detail: "3 × 20 · lento y consciente",            target: "Retracción" },
      { name: "Remo 1 brazo apoyado",       detail: "3 × 15 · codo cerca del cuerpo",         target: "Dorsal" },
      { name: "Superman / extensión suelo", detail: "3 × 12",                                 target: "Erector espinal" },
      { name: "Apertura de pecho c/banda",  detail: "2 × 30 seg · wall stretch",              target: "Liberación pectoral" },
    ],
  },
  {
    block: "Cardio + Sauna", tag: "LISS · HIIT · Recuperación",
    duration: "60 min", color: "#EAEAEA",
    focus: "Cardio LISS o HIIT moderado. El sauna reduce cortisol hasta un 23% post-ejercicio.",
    exercises: [
      { name: "Opción A: Elíptica o bici", detail: "35–40 min · Zona 2",                    target: "LISS" },
      { name: "Opción B: HIIT",            detail: "30s intenso / 90s suave × 8–10 series", target: "HIIT" },
      { name: "Sauna seco",                detail: "15–20 min post-cardio",                  target: "Recuperación" },
    ],
  },
  {
    block: "Tren Inferior · Glúteo", tag: "Cuádriceps · Glúteo medio · Isquiotibiales",
    duration: "60 min", color: "#EAEAEA",
    img: "/img-tren-inferior-gluteo.png",
    focus: "Segunda sesión de piernas. Crear volumen abajo redistribuye visualmente la proporción del cuerpo.",
    exercises: [
      { name: "Bulgarian Split Squat",       detail: "Mancuernas · 4 × 10",      target: "Cuádriceps y glúteo" },
      { name: "Good Morning",                detail: "Banda · 3 × 15",            target: "Isquio y glúteo" },
      { name: "Abducción lateral de cadera", detail: "Banda · 3 × 20",            target: "Glúteo medio" },
      { name: "Zancada reverse",             detail: "Mancuerna · 3 × 12",        target: "Equilibrio y glúteo" },
      { name: "Plancha lateral + apertura",  detail: "3 × 10",                    target: "Oblicuos" },
      { name: "Bird-Dog",                    detail: "3 × 10 · extensión lenta",  target: "Lumbar" },
    ],
  },
  {
    block: "Hombros + Brazos", tag: "Deltoides · Bíceps · Tríceps",
    duration: "50 min", color: "#C4FC7B",
    img: "/img-hombros-brazos.png",
    focus: "No buscamos volumen. Buscamos definición en deltoides posterior y lateral — hombros estrechos, cuello largo.",
    exercises: [
      { name: "Elevación lateral (inclinada 30°)", detail: "Carga baja · 4 × 20", target: "Deltoides medio" },
      { name: "Vuelos posteriores (pájaro)",       detail: "Mancuernas · 4 × 20", target: "Deltoides posterior" },
      { name: "Press Arnold muy ligero",           detail: "3 × 18 reps",          target: "Cabeza anterior/media" },
      { name: "Curl martillo con banda",           detail: "3 × 15",               target: "Bíceps braquial" },
      { name: "Extensión tríceps sobre cabeza",    detail: "Banda · 3 × 15",       target: "Cabeza larga" },
      { name: "Remo al mentón (agarre ancho)",     detail: "Banda · 3 × 15",       target: "Deltoides lateral" },
    ],
  },
  {
    block: "Cardio + Sauna", tag: "Alternar con sesión anterior",
    duration: "60 min", color: "#EAEAEA",
    focus: "Varía el cardio respecto a la sesión anterior. El sauna post-cardio tiene beneficio adicional en síntesis proteica.",
    exercises: [
      { name: "Cardio alternado", detail: "Si hiciste LISS → HIIT, y viceversa", target: "Adaptación" },
      { name: "Sauna seco",       detail: "15–20 min · hidratación previa",       target: "Recuperación" },
    ],
  },
  {
    block: "Descanso activo", tag: "Movilidad · Recuperación",
    duration: "30–45 min", color: "#EAEAEA",
    focus: "El músculo crece en el descanso, no durante el entrenamiento.",
    exercises: [
      { name: "Caminata, yoga o movilidad", detail: "30–45 min suave", target: "Recuperación" },
    ],
  },
];

const PORTFOLIO_TASKS = [
  { id: "p1", phase: "Sem 1–2", task: "Inventariar proyectos corporativos con impacto medible" },
  { id: "p2", phase: "Sem 1–2", task: "Elegir 3–4 casos de éxito para documentar" },
  { id: "p3", phase: "Sem 3–4", task: "Redactar caso #1 — contexto, proceso, resultado" },
  { id: "p4", phase: "Sem 3–4", task: "Redactar caso #2" },
  { id: "p5", phase: "Sem 5–6", task: "Redactar casos #3 y #4" },
  { id: "p6", phase: "Sem 5–6", task: "Armar lista de software factories a contactar" },
  { id: "p7", phase: "Sem 5–6", task: "Escribir mensaje de presentación personalizado" },
  { id: "p8", phase: "Sem 7+",  task: "Enviar outreach a primeras 10 factories" },
];

const FASE_ITEMS = [
  { text: "Ejercicio en casa 3×/semana + clases de cardio", active: true  },
  { text: "2h diarias construyendo portafolio UX",          active: true  },
  { text: "1h prospección a software factories",            active: true  },
  { text: "20–30 min de arte, sin presión",                 active: true  },
  { text: "Critera / Camel IA — Fase 2 (sem. 7+)",          active: false },
];

const PHASE_COLORS = {
  "Sem 1–2": "#EAEAEA",
  "Sem 3–4": "#C4FC7B",
  "Sem 5–6": "#C4FC7B",
  "Sem 7+":  "#AC4DE2",
};
const PHASE_TEXT = {
  "Sem 1–2": "#111111",
  "Sem 3–4": "#111111",
  "Sem 5–6": "#111111",
  "Sem 7+":  "#FFF1B5",
};

// ─── STORAGE ────────────────────────────────────────────────────────────────
function useStorage(key, def) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; }
    catch { return def; }
  });
  const update = v => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, update];
}

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const G = {
  bg:        "#FFFFFF",
  surface:   "#EAEAEA",        // chips y fondos neutros
  card:      "#FAFAFA",
  ink:       "#000000",        // negro puro — títulos
  muted:     "#666666",        // textos secundarios
  dim:       "#ABABAB",        // nav inactivo
  purple:    "#AC4DE2",        // header bg
  purpleDim: "#A166CE",        // gradiente progress inicio
  lime:      "#C8F51F",        // acento verde lima — textos sobre negro
  limeNav:   "#AFD913",        // indicador nav activo
  limeCard:  "#C4FC7B",        // card entrenamiento bg
  chipActive:"#BE6CEC",        // chip activo (Camille)
  black:     "#000000",        // card portafolio bg
  border:    "#E8E8E8",
  font:      "'DM Sans', 'Inter', system-ui, sans-serif",
};

// ─── HOME ────────────────────────────────────────────────────────────────────
function HomeTab({ isHabitDone, tasks, setTab, completedToday, suppLog, postLog }) {
  const pending    = PORTFOLIO_TASKS.filter(t => !tasks[t.id]).slice(0, 3);
  const isTraining = [0, 2, 4].includes(todayIdx);

  // Progreso global: hábitos + portafolio (tareas completadas) + suplementos
  const todayKey = new Date().toISOString().slice(0, 10);
  const suppDone   = SUPPLEMENTS.filter(s => !!suppLog?.[`${todayKey}-${s.id}`]).length;
  const postDone   = [...POSTURE_RELEASE, ...POSTURE_ACTIVATE]
    .filter((_, i) => i < POSTURE_RELEASE.length
      ? !!postLog?.[`${todayKey}-rel-${i}`]
      : !!postLog?.[`${todayKey}-act-${i - POSTURE_RELEASE.length}`]).length;
  const portDone   = PORTFOLIO_TASKS.filter(t => tasks[t.id]).length;

  const TOTAL_ITEMS = HABITS.length + SUPPLEMENTS.length + POSTURE_RELEASE.length + POSTURE_ACTIVATE.length + 1; // +1 portafolio como 1 bloque
  const portScore  = portDone > 0 ? 1 : 0;
  const totalDone  = completedToday + suppDone + postDone + portScore;
  const pct        = (totalDone / TOTAL_ITEMS) * 100;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

      {/* HERO — sobre fondo blanco, título grande negro */}
      <div style={{ padding:"8px 4px 0" }}>
        <div style={{ fontSize:11, fontWeight:400, color:G.muted, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>
          Hoy · {DAYS[todayIdx]}
        </div>
        <div style={{ fontSize:40, fontWeight:700, color:G.ink, lineHeight:1.15, marginBottom:16 }}>
          {completedToday === 0 ? "Arrancamos\ncon fuerza" : completedToday === HABITS.length ? "Día\ncompleto" : "Sigue\nasí"}
        </div>
        {/* Progress bar: gradiente purple → lime */}
        <div style={{ height:5, background:G.surface, borderRadius:100, marginBottom:14, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct || 3}%`, borderRadius:100, transition:"width .5s",
            background:"linear-gradient(to right, #A166CE, #C8F51F)" }} />
        </div>

        {/* CHIPS — todos los bloques del día */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {/* Hábitos */}
          {HABITS.map((h) => {
            const done = isHabitDone(h.id, todayIdx);
            return (
              <div key={h.id} onClick={() => setTab("habitos")} style={{
                borderRadius:11, padding:"5px 10px", fontSize:10, fontWeight:400,
                background: done ? G.chipActive : G.surface,
                color: done ? "#fff" : G.ink,
                cursor:"pointer", transition:"all .2s",
              }}>{h.label}</div>
            );
          })}
          {/* Portafolio — un chip por tarea pendiente/completada */}
          {(() => {
            const portTotal = PORTFOLIO_TASKS.length;
            const portComp  = PORTFOLIO_TASKS.filter(t => tasks[t.id]).length;
            const done = portComp === portTotal;
            return (
              <div onClick={() => setTab("portafolio")} style={{
                borderRadius:11, padding:"5px 10px", fontSize:10, fontWeight:400,
                background: portComp > 0 ? G.chipActive : G.surface,
                color: portComp > 0 ? "#fff" : G.ink,
                cursor:"pointer", transition:"all .2s",
              }}>Portafolio {portComp}/{portTotal}</div>
            );
          })()}
          {/* Suplementos */}
          {(() => {
            const done = SUPPLEMENTS.filter(s => !!suppLog?.[`${todayKey}-${s.id}`]).length;
            return (
              <div onClick={() => setTab("cuerpo")} style={{
                borderRadius:11, padding:"5px 10px", fontSize:10, fontWeight:400,
                background: done > 0 ? G.chipActive : G.surface,
                color: done > 0 ? "#fff" : G.ink,
                cursor:"pointer", transition:"all .2s",
              }}>Suplementos {done}/{SUPPLEMENTS.length}</div>
            );
          })()}
          {/* Postura */}
          {(() => {
            const total = POSTURE_RELEASE.length + POSTURE_ACTIVATE.length;
            const done  = POSTURE_RELEASE.filter((_,i) => !!postLog?.[`${todayKey}-rel-${i}`]).length
                        + POSTURE_ACTIVATE.filter((_,i) => !!postLog?.[`${todayKey}-act-${i}`]).length;
            return (
              <div onClick={() => setTab("cuerpo")} style={{
                borderRadius:11, padding:"5px 10px", fontSize:10, fontWeight:400,
                background: done > 0 ? G.limeCard : G.surface,
                color: G.ink,
                cursor:"pointer", transition:"all .2s",
              }}>Postura {done}/{total}</div>
            );
          })()}
        </div>
      </div>

      {/* TRAINING — verde lima #c4fc7b */}
      {isTraining && (
        <div onClick={() => setTab("rutina")} style={{ background:G.limeCard, borderRadius:16, padding:"18px 20px", cursor:"pointer" }}>
          <div style={{ fontSize:9, fontWeight:400, color:G.muted, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>HOY TOCA</div>
          <div style={{ fontSize:20, fontWeight:400, color:G.ink, marginBottom:6 }}>Entrenamiento</div>
          <div style={{ fontSize:12, color:G.muted, marginBottom:16 }}>Tren superior · 45 min en casa</div>
          <div style={{ fontSize:12, fontWeight:400, color:G.ink }}>Ver rutina →</div>
        </div>
      )}

      {/* PORTFOLIO — negro con lima */}
      <div onClick={() => setTab("portafolio")} style={{ background:G.ink, borderRadius:16, padding:"18px 20px", cursor:"pointer" }}>
        <div style={{ fontSize:9, fontWeight:400, color:G.muted, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>PORTAFOLIO · PRÓXIMOS PASOS</div>
        {pending.length === 0
          ? <div style={{ fontSize:20, fontWeight:700, color:G.lime }}>¡Todo listo!</div>
          : pending.map(t => (
            <div key={t.id} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid rgba(255,255,255,0.08)` }}>
              <span style={{ fontSize:9, fontWeight:400, color:G.lime, letterSpacing:1, textTransform:"uppercase", minWidth:48 }}>{t.phase}</span>
              <span style={{ fontSize:11, color:"#fff", lineHeight:1.45 }}>{t.task}</span>
            </div>
          ))
        }
        <div style={{ fontSize:12, color:"#fff", marginTop:12 }}>Ver plan completo →</div>
      </div>

      {/* FASE */}
      <div style={{ background:G.card, borderRadius:20, padding:"18px 20px", border:`1px solid ${G.border}` }}>
        <div style={{ fontSize:11, fontWeight:600, color:G.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>Estrategia</div>
        <div style={{ fontSize:22, fontWeight:700, color:G.ink, marginBottom:12 }}>Fase 1</div>
        {FASE_ITEMS.map((f, i) => (
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"6px 0", opacity: f.active ? 1 : 0.3 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background: f.active ? "#AC4DE2" : G.dim, flexShrink:0, marginTop:5 }} />
            <span style={{ fontSize:13, color: f.active ? G.ink : G.muted, lineHeight:1.5 }}>{f.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

// ─── RUTINA ──────────────────────────────────────────────────────────────────
function RutinaTab() {
  const [open, setOpen] = useState(null);
  const [imgModal, setImgModal] = useState(null);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

      {/* IMAGE MODAL */}
      {imgModal && (
        <div onClick={() => setImgModal(null)} style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:999,
          display:"flex", alignItems:"center", justifyContent:"center", padding:16
        }}>
          <img src={imgModal} alt="ejercicios"
            style={{ maxWidth:"100%", maxHeight:"90vh", borderRadius:12, display:"block" }} />
          <div style={{ position:"absolute", top:20, right:20, color:"#fff", fontSize:28, cursor:"pointer" }}>✕</div>
        </div>
      )}

      <div style={{ marginBottom:4 }}>
        <div style={{ fontSize:11, fontWeight:400, color:G.muted, letterSpacing:2, textTransform:"uppercase" }}>Programa completo · 12 semanas</div>
        <div style={{ fontSize:28, fontWeight:700, color:G.ink, lineHeight:1.1, marginTop:2 }}>Rutina</div>
        <div style={{ fontSize:13, color:G.muted, marginTop:4 }}>4 bloques de fuerza · 2 cardio + sauna · 1 descanso activo</div>
      </div>

      {ROUTINE.map((block, bi) => (
        <div key={bi} style={{ background: block.color, borderRadius:16, padding:"16px 16px 10px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:9, fontWeight:400, color:G.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:2 }}>{block.tag}</div>
              <div style={{ fontSize:18, fontWeight:700, color:G.ink }}>{block.block}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              {block.img && (
                <button onClick={() => setImgModal(block.img)}
                  style={{ border:"1.5px solid rgba(0,0,0,0.15)", background:"rgba(255,255,255,0.7)", borderRadius:8, padding:"4px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                  <Icon name="eye" size={14} color={G.purple} strokeWidth={2} />
                  <span style={{ fontSize:10, fontWeight:600, color:G.purple }}>Ver</span>
                </button>
              )}
              <div style={{ fontSize:10, color:G.muted, background:"rgba(0,0,0,0.07)", borderRadius:6, padding:"3px 8px", whiteSpace:"nowrap" }}>{block.duration}</div>
            </div>
          </div>
          <div style={{ fontSize:12, color:G.muted, lineHeight:1.5, marginBottom:10, fontStyle:"italic" }}>{block.focus}</div>
          {block.exercises.map((ex, ei) => {
            const key = `${bi}-${ei}`;
            const isOpen = open === key;
            return (
              <div key={ei} style={{ borderTop:"1px solid rgba(0,0,0,0.08)", padding:"9px 0" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span onClick={() => setOpen(isOpen ? null : key)}
                    style={{ fontSize:13, fontWeight:600, color:G.ink, flex:1, cursor:"pointer" }}>{ex.name}</span>
                  {ex.target && (
                    <span style={{ fontSize:9, fontWeight:600, color:G.purple, background:"rgba(172,77,226,0.1)", borderRadius:5, padding:"2px 7px", letterSpacing:0.5, textTransform:"uppercase" }}>{ex.target}</span>
                  )}
                </div>
                {isOpen && (
                  <div style={{ fontSize:12, color:G.muted, marginTop:6, lineHeight:1.5 }}>{ex.detail}</div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ background:G.ink, borderRadius:16, padding:"16px 18px 14px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:10 }}>Progresión · 12 semanas</div>
        {[
          { w:"Sem 1–4",  t:"Activación y postura. Técnica perfecta, cargas moderadas." },
          { w:"Sem 5–8",  t:"Progresión de carga. +10% tren inferior cada 2 semanas." },
          { w:"Sem 9–12", t:"Definición. Superseries en brazos, más volumen de cardio." },
        ].map((p, i) => (
          <div key={i} style={{ display:"flex", gap:14, padding:"8px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
            <span style={{ fontSize:11, fontWeight:700, color:G.lime, width:74, flexShrink:0 }}>{p.w}</span>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>{p.t}</span>
          </div>
        ))}
      </div>

      <div style={{ background:G.limeCard, borderRadius:14, padding:"14px 16px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:G.muted, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Protocolo postural · cada día</div>
        {[
          "Trapecio superior — 2 min, oreja al hombro",
          "Pectoral — 30 seg × 3 contra el marco de la puerta",
          "Face Pull — 3 × 20 todos los días sin excepción",
          "Respiración 360° — 5 min antes de entrenar",
        ].map((t, i) => (
          <div key={i} style={{ fontSize:12, color:G.ink, padding:"5px 0", borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.08)" : "none", lineHeight:1.4 }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

function HabitosTab({ isHabitDone, toggleHabit }) {
  const weekTotal = HABITS.length * 7;
  const weekDone  = HABITS.reduce((acc, h) => acc + DAYS.reduce((a,_,di) => a+(isHabitDone(h.id,di)?1:0),0), 0);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ marginBottom:4 }}>
        <div style={{ fontSize:11, fontWeight:600, color:G.muted, letterSpacing:2, textTransform:"uppercase" }}>Esta semana</div>
        <div style={{ fontSize:28, fontWeight:700, color:G.ink, lineHeight:1.1, marginTop:2 }}>Hábitos</div>
        <div style={{ display:"flex", alignItems:"baseline", gap:6, marginTop:4 }}>
          <span style={{ fontSize:24, fontWeight:700, color:G.blue }}>{weekDone}</span>
          <span style={{ fontSize:14, color:G.muted }}>/{weekTotal} completados</span>
        </div>
      </div>

      {HABITS.map(h => {
        const weekCount = DAYS.reduce((a,_,di) => a+(isHabitDone(h.id,di)?1:0), 0);
        return (
          <div key={h.id} style={{ background: G.card, borderRadius:16, padding:"14px 16px", border:`1px solid ${G.border}`, borderLeft:`3px solid ${h.color}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <Icon name={h.icon} size={18} color={h.color} strokeWidth={1.8} />
              <span style={{ fontSize:14, fontWeight:600, color:G.ink, flex:1 }}>{h.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:G.muted }}>{weekCount}×</span>
            </div>
            <div style={{ display:"flex", gap:5 }}>
              {DAYS.map((d, di) => {
                const done    = isHabitDone(h.id, di);
                const isToday = di === todayIdx;
                return (
                  <button key={di} onClick={() => toggleHabit(h.id, di)} style={{
                    flex:1, border:"none", borderRadius:8, padding:"7px 2px",
                    cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                    background: done ? h.color : G.surface,
                    outline: isToday ? `2px solid ${h.color}` : "none",                    outlineOffset: 2,
                    transition:"all .15s", minWidth:0,
                  }}>
                    <span style={{ fontSize:9, fontWeight:600, letterSpacing:0.3, color: done ? "rgba(255,255,255,0.8)" : G.dim }}>{d}</span>
                    {done && <span style={{ fontSize:9, color:"#fff", fontWeight:700 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── PORTAFOLIO ───────────────────────────────────────────────────────────────
function PortafolioTab({ tasks, toggleTask }) {
  const done   = PORTFOLIO_TASKS.filter(t => tasks[t.id]).length;
  const total  = PORTFOLIO_TASKS.length;
  const pct    = Math.round((done/total)*100);
  const phases = [...new Set(PORTFOLIO_TASKS.map(t => t.phase))];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ marginBottom:4 }}>
        <div style={{ fontSize:11, fontWeight:600, color:G.muted, letterSpacing:2, textTransform:"uppercase" }}>Software factories · 10 años UX</div>
        <div style={{ fontSize:28, fontWeight:700, color:G.ink, lineHeight:1.1, marginTop:2 }}>Portafolio</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:8 }}>
          <div style={{ flex:1, height:5, background:G.surface, borderRadius:3, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:G.purple, borderRadius:3, transition:"width .4s" }} />
          </div>
          <span style={{ fontSize:12, fontWeight:600, color:G.muted }}>{done}/{total} · {pct}%</span>
        </div>
      </div>

      {phases.map(phase => {
        const pt     = PORTFOLIO_TASKS.filter(t => t.phase === phase);
        const phDone = pt.filter(t => tasks[t.id]).length;
        const allDone = phDone === pt.length;
        const bg     = allDone ? G.surface : (PHASE_COLORS[phase] || G.blueLight);
        const tc     = allDone ? G.muted   : (PHASE_TEXT[phase]   || G.ink);

        return (
          <div key={phase} style={{ background:bg, borderRadius:16, padding:"16px 18px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
              <span style={{ fontSize:16, fontWeight:700, color:tc }}>{phase}</span>
              <span style={{ fontSize:12, fontWeight:600, color: allDone ? G.dim : "rgba(0,0,0,0.35)" }}>{phDone}/{pt.length}</span>
            </div>
            {pt.map(t => (
              <div key={t.id} onClick={() => toggleTask(t.id)}
                style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"9px 0", borderTop:"1px solid rgba(0,0,0,0.07)", cursor:"pointer" }}>
                <div style={{
                  width:18, height:18, borderRadius:5, flexShrink:0, marginTop:1,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background: tasks[t.id] ? "#AC4DE2" : "rgba(0,0,0,0.08)",
                  border:`1.5px solid ${tasks[t.id] ? "#AC4DE2" : "rgba(0,0,0,0.15)"}`,
                  transition:"all .15s",
                }}>
                  {tasks[t.id] && <Icon name="check" size={11} color="#fff" strokeWidth={2.5} />}
                </div>
                <span style={{ fontSize:13, color: tasks[t.id] ? G.muted : tc, lineHeight:1.5, textDecoration: tasks[t.id]?"line-through":"none", transition:"all .2s" }}>
                  {t.task}
                </span>
              </div>
            ))}
          </div>
        );
      })}

      <div style={{ background:G.purple, borderRadius:14, padding:"16px 18px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#FFF1B5", letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Recuerda</div>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6, margin:0 }}>
          3–4 casos sólidos con contexto, proceso y resultado medible es todo lo que necesitas para empezar a escribir a factories.
        </p>
      </div>
    </div>
  );
}

// ─── CUERPO TAB (Suplementos + Postura) ─────────────────────────────────────
const SUPPLEMENTS = [
  { id:"s1", priority:"Alta", priorityColor:G.purple, priorityText:"#fff",
    name:"Proteína en polvo", dose:"20–25g",
    hora:"Post entrenamiento, inmediatamente",
    detail:"Whey isolate si toleras el lácteo, vegana de guisante + arroz si no. Lo clave es llegar a 1.6–2g/kg al día (~112–140g). La marca es secundaria." },
  { id:"s2", priority:"Alta", priorityColor:G.purple, priorityText:"#fff",
    name:"Colágeno hidrolizado", dose:"10g + vitamina C",
    hora:"Al despertar, 30–60 min antes de entrenar",
    detail:"Especialmente relevante postparto. Beneficia tendones, piel y articulaciones. Máximo efecto en tejido conectivo si lo tomas antes del entrenamiento." },
  { id:"s3", priority:"Alta", priorityColor:G.purple, priorityText:"#fff",
    name:"Vitamina D3 + K2", dose:"2000–4000 UI D3 + 100mcg K2",
    hora:"Con el desayuno (con grasa para absorción)",
    detail:"El postparto suele dejar niveles bajos. Influye en cortisol, estrógeno, función muscular y ánimo. La K2 dirige el calcio al hueso, no a las arterias." },
  { id:"s4", priority:"Recomendado", priorityColor:G.limeCard, priorityText:G.ink,
    name:"Magnesio glicinato", dose:"300–400mg",
    hora:"30 min antes de dormir",
    detail:"Reduce cortisol nocturno, mejora el sueño y la tensión muscular. Perfecto para tus trapecios. No óxido — glicinato o bisglicinato." },
  { id:"s5", priority:"Recomendado", priorityColor:G.limeCard, priorityText:G.ink,
    name:"Omega-3 EPA + DHA", dose:"2–3g EPA+DHA",
    hora:"Con la comida más grande del día",
    detail:"Antiinflamatorio sistémico. Reduce inflamación muscular, mejora sensibilidad a la insulina y el perfil hormonal postparto. Mínimo 2 meses para notar diferencia." },
  { id:"s6", priority:"Opcional", priorityColor:G.surface, priorityText:G.muted,
    name:"Creatina monohidrato", dose:"3–5g",
    hora:"Cualquier momento, con agua",
    detail:"No retiene agua visible en dosis moderada. Evidencia en fuerza, rendimiento y función cognitiva. Para tu fase actual es opcional pero no contraproducente." },
];

const POSTURE_RELEASE = [
  { name:"Trapecio superior", how:"Oreja al hombro, mano contraria en la sien sin tirar. Respiración profunda. 2 min diarios sentada, brazos pesados hacia abajo." },
  { name:"Pectoral menor — pared", how:"Antebrazo en el marco de la puerta, codo a 90°. Gira el cuerpo hasta sentir apertura en el pecho. 30 seg × 3 cada lado. Indispensable post-lactancia." },
  { name:"Escalenos y ECM", how:"Gira la cabeza 45° y lleva la barbilla ligeramente hacia arriba. Tensión en el lateral del cuello. 20 seg cada lado." },
  { name:"Dorsal media — rodillo", how:"2 min rodando la zona entre escápulas antes de entrenar. Sin rodillo: pelota de tenis contra la pared en esa zona." },
];

const POSTURE_ACTIVATE = [
  { name:"Face Pull diario", how:"Con banda en altura media, tira hacia la cara con codos altos y separados. Siente la contracción entre escápulas. 3 × 20 cada día sin excepción." },
  { name:"Pull-apart con banda", how:"Banda con ambas manos al frente, brazos extendidos. Abre los brazos hacia los lados. Enfócate en juntar las escápulas. Lento y consciente." },
  { name:"Push-up plus (serratos)", how:"En posición de plancha, empuja el suelo y separa las escápulas al máximo al final. Activa el serrato anterior, que ancla la escápula." },
  { name:"Respiración 360°", how:"Inhala expandiendo las costillas hacia los lados (no el pecho). Al exhalar, mete el ombligo suavemente hacia dentro. 5 min antes de cada entrenamiento." },
];

function CuerpoTab({ suppLog, setSuppLog, postLog, setPostLog }) {
  const [openSupp, setOpenSupp] = useState(null);
  const [openPost, setOpenPost] = useState(null);
  const [imgModal, setImgModal] = useState(null);
  const [showImg, setShowImg] = useState(null); // key for image overlay

  const todayKey = () => new Date().toISOString().slice(0, 10);

  const toggleSupp = (e, id) => {
    e.stopPropagation();
    const k = `${todayKey()}-${id}`;
    setSuppLog({ ...suppLog, [k]: !suppLog[k] });
  };
  const isTaken = (id) => !!suppLog[`${todayKey()}-${id}`];
  const takenToday = SUPPLEMENTS.filter(s => isTaken(s.id)).length;

  const togglePost = (e, id) => {
    e.stopPropagation();
    const k = `${todayKey()}-${id}`;
    setPostLog({ ...postLog, [k]: !postLog[k] });
  };
  const isDonePost = (id) => !!postLog[`${todayKey()}-${id}`];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

      {/* HEADER SUPLEMENTOS */}
      <div style={{ marginBottom:4 }}>
        <div style={{ fontSize:11, fontWeight:400, color:G.muted, letterSpacing:2, textTransform:"uppercase" }}>Sin humo · con evidencia</div>
        <div style={{ fontSize:28, fontWeight:700, color:G.ink, lineHeight:1.1, marginTop:2 }}>Suplementos</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:8 }}>
          <div style={{ flex:1, height:4, background:G.surface, borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${(takenToday/SUPPLEMENTS.length)*100}%`, background:G.purple, borderRadius:2, transition:"width .4s" }} />
          </div>
          <span style={{ fontSize:11, fontWeight:600, color:G.muted }}>{takenToday}/{SUPPLEMENTS.length} hoy</span>
        </div>
      </div>

      {SUPPLEMENTS.map((s) => {
        const isOpen = openSupp === s.id;
        const taken  = isTaken(s.id);
        return (
          <div key={s.id} style={{
            background: taken ? "#F3E8FD" : G.surface, borderRadius:14, padding:"14px 16px",
            border:`1.5px solid ${taken ? G.purple : G.border}`, transition:"all .2s"
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
              onClick={() => setOpenSupp(isOpen ? null : s.id)}>
              <div style={{ flex:1 }}>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:1, textTransform:"uppercase",
                  padding:"2px 8px", borderRadius:4, background:s.priorityColor, color:s.priorityText }}>{s.priority}</span>
                <div style={{ fontSize:14, fontWeight:700, marginTop:4,
                  color: taken ? G.purple : G.ink, textDecoration: taken ? "line-through" : "none" }}>{s.name}</div>
                <div style={{ fontSize:11, color:G.muted, marginTop:2 }}>⏰ {s.hora}</div>
              </div>
              {/* CHECK — siempre visible */}
              <button onClick={(e) => toggleSupp(e, s.id)} style={{
                width:36, height:36, borderRadius:10, flexShrink:0, cursor:"pointer",
                border:`2px solid ${taken ? G.purple : G.dim}`,
                background: taken ? G.purple : "white",
                display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s"
              }}>
                {taken
                  ? <Icon name="check" size={16} color="#fff" strokeWidth={2.5} />
                  : <div style={{ width:10, height:10, borderRadius:3, border:`2px solid ${G.dim}` }} />
                }
              </button>
            </div>
            {isOpen && (
              <div style={{ marginTop:10, borderTop:`1px solid ${G.border}`, paddingTop:10 }}>
                <div style={{ fontSize:11, fontWeight:700, color:G.purple, marginBottom:6 }}>{s.dose}</div>
                <div style={{ fontSize:12, color:G.muted, lineHeight:1.6 }}>{s.detail}</div>
              </div>
            )}
          </div>
        );
      })}

      {/* POSTURA */}
      <div style={{ marginTop:8, marginBottom:4 }}>
        <div style={{ fontSize:11, fontWeight:400, color:G.muted, letterSpacing:2, textTransform:"uppercase" }}>Liberar + activar · cada día</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:2 }}>
          <div style={{ fontSize:28, fontWeight:700, color:G.ink, lineHeight:1.1 }}>Postura</div>
          <button onClick={() => setImgModal("/img-postura.png")}
            style={{ border:`1.5px solid ${G.border}`, background:G.surface, borderRadius:8, padding:"5px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
            <Icon name="eye" size={14} color={G.purple} strokeWidth={2} />
            <span style={{ fontSize:10, fontWeight:600, color:G.purple }}>Ver guía</span>
          </button>
        </div>
        <div style={{ fontSize:13, color:G.muted, marginTop:4 }}>Libera lo hipertónico, activa lo inhibido. El orden importa.</div>
      </div>

      {/* SOLTAR */}
      <div style={{ background:"#FEF2F2", borderRadius:14, padding:"14px 16px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#DC2626", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>🔴 Soltar — músculos tensos</div>
        {POSTURE_RELEASE.map((p, i) => {
          const key = `rel-${i}`;
          const isOpen = openPost === key;
          const done = isDonePost(key);
          return (
            <div key={i} style={{ borderTop: i>0 ? `1px solid rgba(0,0,0,0.07)` : "none", padding:"9px 0" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span onClick={() => setOpenPost(isOpen ? null : key)}
                  style={{ fontSize:13, fontWeight:600, color: done ? "#DC2626" : G.ink, flex:1, cursor:"pointer",
                    textDecoration: done ? "line-through" : "none", opacity: done ? 0.6 : 1 }}>{p.name}</span>
                {/* EYE — ver descripción */}
                <button onClick={() => setOpenPost(isOpen ? null : key)} style={{ border:"none", background:"transparent", cursor:"pointer", padding:4 }}>
                  <Icon name="eye" size={16} color={isOpen ? G.purple : G.dim} strokeWidth={1.8} />
                </button>
                {/* CHECK */}
                <button onClick={(e) => togglePost(e, key)} style={{
                  width:30, height:30, borderRadius:8, flexShrink:0, cursor:"pointer",
                  border:`2px solid ${done ? "#DC2626" : "rgba(0,0,0,0.2)"}`,
                  background: done ? "#DC2626" : "white",
                  display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s"
                }}>
                  {done
                    ? <Icon name="check" size={13} color="#fff" strokeWidth={2.5} />
                    : <div style={{ width:8, height:8, borderRadius:2, border:"2px solid rgba(0,0,0,0.2)" }} />
                  }
                </button>
              </div>
              {isOpen && <div style={{ fontSize:12, color:G.muted, marginTop:6, lineHeight:1.6 }}>{p.how}</div>}
            </div>
          );
        })}
      </div>

      {/* ACTIVAR */}
      <div style={{ background:G.limeCard, borderRadius:14, padding:"14px 16px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#166534", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>🟢 Activar — músculos inhibidos</div>
        {POSTURE_ACTIVATE.map((p, i) => {
          const key = `act-${i}`;
          const isOpen = openPost === key;
          const done = isDonePost(key);
          return (
            <div key={i} style={{ borderTop: i>0 ? `1px solid rgba(0,0,0,0.08)` : "none", padding:"9px 0" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span onClick={() => setOpenPost(isOpen ? null : key)}
                  style={{ fontSize:13, fontWeight:600, color: done ? "#166534" : G.ink, flex:1, cursor:"pointer",
                    textDecoration: done ? "line-through" : "none", opacity: done ? 0.6 : 1 }}>{p.name}</span>
                <button onClick={() => setOpenPost(isOpen ? null : key)} style={{ border:"none", background:"transparent", cursor:"pointer", padding:4 }}>
                  <Icon name="eye" size={16} color={isOpen ? G.purple : G.dim} strokeWidth={1.8} />
                </button>
                <button onClick={(e) => togglePost(e, key)} style={{
                  width:30, height:30, borderRadius:8, flexShrink:0, cursor:"pointer",
                  border:`2px solid ${done ? "#166534" : "rgba(0,0,0,0.2)"}`,
                  background: done ? "#166534" : "white",
                  display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s"
                }}>
                  {done
                    ? <Icon name="check" size={13} color="#fff" strokeWidth={2.5} />
                    : <div style={{ width:8, height:8, borderRadius:2, border:"2px solid rgba(0,0,0,0.2)" }} />
                  }
                </button>
              </div>
              {isOpen && <div style={{ fontSize:12, color:G.muted, marginTop:6, lineHeight:1.6 }}>{p.how}</div>}
            </div>
          );
        })}
      </div>

      <div style={{ background:G.ink, borderRadius:14, padding:"14px 16px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:G.lime, letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>El orden importa</div>
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.6)", lineHeight:1.6, margin:0 }}>
          Primero libera (trapecio, pectoral), luego activa (face pull, pull-apart). Si activas sobre un músculo antagonista tenso, el movimiento no llega correctamente.
        </p>
      </div>

    </div>
  );
}

// ─── NAV TABS ────────────────────────────────────────────────────────────────
const TABS = [
  { id:"home",       label:"Inicio",     icon:"home"      },
  { id:"rutina",     label:"Rutina",     icon:"dumbbell"  },
  { id:"habitos",    label:"Hábitos",    icon:"check"     },
  { id:"portafolio", label:"Portafolio", icon:"briefcase" },
  { id:"cuerpo",     label:"Cuerpo",     icon:"person"    },
];

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]     = useState("home");
  const [habits, setHabits] = useStorage("dana_habits_v3", {});
  const [tasks,  setTasks]  = useStorage("dana_tasks_v3",  {});
  const [suppLog, setSuppLog] = useStorage("supp_log_v1", {});
  const [postLog, setPostLog] = useStorage("post_log_v1", {});

  const weekKey = () => { const d = new Date(); return `${d.getFullYear()}-W${Math.ceil(d.getDate()/7)}`; };
  const toggleHabit  = (hid, di) => { const k=`${weekKey()}-${hid}-${di}`; setHabits({...habits,[k]:!habits[k]}); };
  const isHabitDone  = (hid, di) => !!habits[`${weekKey()}-${hid}-${di}`];
  const toggleTask   = (tid) => setTasks({...tasks,[tid]:!tasks[tid]});
  const completedToday = HABITS.filter(h => isHabitDone(h.id, todayIdx)).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${G.bg}; font-family: ${G.font}; }
        button { font-family: inherit; cursor: pointer; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>

      <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", maxWidth:480, margin:"0 auto", background:G.bg, fontFamily:G.font }}>

        {/* HEADER — morado sólido como en Figma */}
        <header style={{ background: G.purple, flexShrink:0, position:"sticky", top:0, zIndex:100 }}>
          <div style={{ padding:"20px 20px 14px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ lineHeight:1.15 }}>
                <div style={{ fontSize:28, fontWeight:700, color:G.ink, letterSpacing:-0.5 }}>{greeting.line1}</div>
                <div style={{ fontSize:28, fontWeight:700, color:G.ink, letterSpacing:-0.5 }}>{greeting.line2}</div>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:10, fontWeight:400, color:"#fff", letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>FASE 1 · EN CURSO</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:2, justifyContent:"flex-end" }}>
                <span style={{ fontSize:32, fontWeight:700, color:G.ink, lineHeight:1 }}>{completedToday}</span>
                <span style={{ fontSize:16, fontWeight:400, color:"rgba(0,0,0,0.35)" }}>/{HABITS.length}</span>
              </div>
              <div style={{ fontSize:10, fontWeight:400, color:"rgba(0,0,0,0.45)", letterSpacing:2, textTransform:"uppercase" }}>{DAYS[todayIdx]}</div>
            </div>
          </div>
          {/* NAV — blanco con indicador lima */}
          <div style={{ background:"#fff", borderBottom:`1px solid ${G.border}`, display:"flex" }}>
            {TABS.map(t => {
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ flex:1, border:"none", background:"transparent", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"8px 4px 0", borderBottom: active ? `2px solid ${G.limeNav}` : "2px solid transparent", transition:"border-color .15s", cursor:"pointer", paddingBottom:8 }}>
                  <Icon name={t.icon} size={18} color={active ? G.ink : G.dim} strokeWidth={active ? 2 : 1.5} />
                  <span style={{ fontSize:10, fontWeight: active ? 700 : 400, color: active ? G.ink : G.dim, letterSpacing:0.3 }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex:1, overflowY:"auto", padding:"36px 16px 40px" }}>
          {tab==="home"       && <HomeTab       isHabitDone={isHabitDone} tasks={tasks} setTab={setTab} completedToday={completedToday} suppLog={suppLog} postLog={postLog} />}
          {tab==="rutina"     && <RutinaTab />}
          {tab==="habitos"    && <HabitosTab    isHabitDone={isHabitDone} toggleHabit={toggleHabit} />}
          {tab==="portafolio" && <PortafolioTab tasks={tasks} toggleTask={toggleTask} />}
          {tab==="cuerpo"     && <CuerpoTab suppLog={suppLog} setSuppLog={setSuppLog} postLog={postLog} setPostLog={setPostLog} />}
        </main>

      </div>
    </>
  );
}
