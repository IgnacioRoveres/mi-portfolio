import { useState } from "react";
import { C, FM } from "../../styles/theme";

export const CAT_COLORS = {
  proyecto:   { bg: "#c0182a18", color: "#c0182a", border: "#c0182a33" },
  tecnologia: { bg: "#6b7aff18", color: "#6b7aff", border: "#6b7aff33" },
  opinion:    { bg: "#d9770618", color: "#d97706", border: "#d9770633" },
};

export const CATS = ["todos", "proyecto", "tecnologia", "opinion"];
export const CAT_LABELS = {
  todos:      "Todos",
  proyecto:   "Proyectos",
  tecnologia: "Tecnología",
  opinion:    "Opinión",
};

export function CatPill({ cat }) {
  const s = CAT_COLORS[cat] || {};
  return (
    <span style={{ fontFamily: FM.mono, fontSize: "10px", letterSpacing: ".1em", padding: "3px 10px", borderRadius: "3px", background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {cat.toUpperCase()}
    </span>
  );
}

export function PostMeta({ post }) {
  const d = new Date(post.date).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
  return (
    <div style={{ fontFamily: FM.mono, fontSize: "11px", color: C.text.faint, whiteSpace: "nowrap" }}>
      {d}<span style={{ margin: "0 7px", color: C.bg.border }}>·</span>{post.readTime} min
    </div>
  );
}

export function CategoryFilter({ active, onChange }) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {CATS.map(cat => (
        <CatBtn key={cat} label={CAT_LABELS[cat]} active={active === cat} onClick={() => onChange(cat)} />
      ))}
    </div>
  );
}

function CatBtn({ label, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ background: active ? C.accent.glow : (h ? C.bg.raised : "none"), border: `1px solid ${active ? C.accent.dim : C.bg.border}`, color: active ? C.accent.base : (h ? C.text.secondary : C.text.muted), padding: "6px 16px", borderRadius: "3px", fontFamily: FM.mono, fontSize: "11px", letterSpacing: ".07em", cursor: "pointer", transition: "all .2s" }}>
      {label}
    </button>
  );
}