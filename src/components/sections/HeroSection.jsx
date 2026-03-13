import { useState } from "react";
import { C, FM } from "../../styles/theme";
import { PERSON, TYPING_ROLES } from "../../data/personal";
import { useTyping } from "../../hooks/useTypingEffect";

export default function HeroSection({ onNav }) {
  const role = useTyping(TYPING_ROLES);
  const [hvr, setHvr] = useState({});

  const btn = (id, primary, label) => {
    const h = hvr[id];
    return (
      <button key={id}
        onClick={() => onNav(id)}
        onMouseEnter={() => setHvr(v => ({ ...v, [id]: true }))}
        onMouseLeave={() => setHvr(v => ({ ...v, [id]: false }))}
        style={{
          background: primary ? (h ? C.accent.base : C.accent.glowMd) : (h ? C.bg.raised : "none"),
          border: `1px solid ${primary ? (h ? C.accent.bright : C.accent.base) : C.bg.border}`,
          color: primary ? C.text.primary : (h ? C.text.secondary : C.text.muted),
          padding: "12px 24px", borderRadius: "4px",
          fontFamily: FM.mono, fontSize: "12px", letterSpacing: ".08em",
          transition: "all .2s", cursor: "pointer",
          boxShadow: primary && h ? `0 0 24px ${C.accent.base}66` : "none",
          whiteSpace: "nowrap",
        }}>
        {label}
      </button>
    );
  };

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: "58px" }}>

      {/* Grilla animada */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.bg.borderHover} 1px,transparent 1px),linear-gradient(90deg,${C.bg.borderHover} 1px,transparent 1px)`, backgroundSize: "48px 48px", animation: "grid-drift 25s linear infinite", opacity: 0.35 }} />

      {/* Glow rojo difuso */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "900px", background: `radial-gradient(circle,${C.accent.base}30 0%,${C.accent.base}0a 45%,transparent 70%)`, pointerEvents: "none" }} />

      {/* Glow rojo concentrado */}
      <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", background: `radial-gradient(circle,${C.accent.base}55 0%,transparent 65%)`, pointerEvents: "none" }} />

      {/* Scanline */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${C.accent.base}55,transparent)`, animation: "scanline 8s linear infinite" }} />
      </div>

      {/* Contenido */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2, maxWidth: "820px", padding: "0 24px", width: "100%" }}>

        <div className="fu1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: FM.mono, fontSize: "11px", color: C.accent.base, letterSpacing: ".18em", marginBottom: "24px", border: `1px solid ${C.accent.base}66`, padding: "6px 16px", borderRadius: "3px", background: C.accent.glowMd }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent.base, animation: "pulse-ring 2s infinite", display: "inline-block" }} />
          DISPONIBLE PARA PROYECTOS
        </div>

        <h1 className="fu2" style={{ fontSize: "clamp(42px,9vw,96px)", fontFamily: FM.display, fontWeight: 800, lineHeight: 1.0, letterSpacing: "-.04em", color: C.text.primary, marginBottom: "16px" }}>
          {PERSON.name}
        </h1>

        <div className="fu3" style={{ fontFamily: FM.mono, fontSize: "clamp(13px,2vw,19px)", color: C.text.muted, marginBottom: "32px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <span style={{ color: C.accent.dim }}>~$</span>
          <span style={{ color: C.text.secondary }}>{role}</span>
          <span style={{ width: "2px", height: "20px", background: C.accent.base, animation: "blink 1s step-end infinite", display: "inline-block" }} />
        </div>

        <p className="fu3" style={{ color: C.text.muted, fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.85, maxWidth: "480px", margin: "0 auto 48px" }}>
          Construyo interfaces y sistemas que funcionan de verdad. Código limpio, diseño intencionado, performance que se nota.
        </p>

        <div className="fu4 hero-btns">
          {btn("projects", true,  "Ver proyectos →")}
          {btn("blog",     false, "Leer blog")}
          {btn("contact",  false, "Contacto")}
        </div>

        <div className="fu5 hero-stats">
          {PERSON.stats.map(({ v, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FM.mono, fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, color: C.text.primary }}>{v}</div>
              <div style={{ fontFamily: FM.mono, fontSize: "10px", color: C.text.faint, letterSpacing: ".12em", marginTop: "5px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}