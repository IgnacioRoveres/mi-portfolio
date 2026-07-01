import { C, FM } from "../../styles/theme";

export const SLabel = ({ children }) => (
  <div style={{ fontFamily: FM.mono, fontSize: "11px", color: C.accent.base, letterSpacing: "0.2em", marginBottom: "14px" }}>
    {children}
  </div>
);

export const STitle = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: FM.display, fontSize: "clamp(30px,5vw,46px)", fontWeight: 800, letterSpacing: "-.025em", color: C.text.primary, lineHeight: 1.1, ...style }}>
    {children}
  </h2>
);

export const Tag = ({ children }) => (
  <span style={{ fontFamily: FM.mono, fontSize: "11px", color: C.text.muted, background: C.bg.raised, border: `1px solid ${C.bg.border}`, padding: "3px 10px", borderRadius: "3px", whiteSpace: "nowrap" }}>
    {children}
  </span>
);

export const StatusBadge = ({ status }) => {
  const col = C.status[status] || C.text.muted;
  return (
    <span style={{ fontFamily: FM.mono, fontSize: "10px", color: col, border: `1px solid ${col}44`, padding: "2px 9px", borderRadius: "3px", letterSpacing: "0.1em" }}>
      ● {status}
    </span>
  );
};

export const TermWin = ({ title, children }) => (
  <div style={{ background: C.bg.surface, border: `1px solid ${C.bg.border}`, borderRadius: "8px", overflow: "hidden" }}>
    <div style={{ background: C.bg.raised, padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${C.bg.border}` }}>
      {["#ff5f57", "#febc2e", "#28c840"].map(c => (
        <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
      ))}
      <span style={{ fontFamily: FM.mono, fontSize: "11px", color: C.text.muted, marginLeft: "8px" }}>{title}</span>
    </div>
    <div style={{ padding: "24px" }}>{children}</div>
  </div>
);

export const SkillBar = ({ name, level, color, visible }) => (
  <div style={{ marginBottom: "18px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
      <span style={{ fontFamily: FM.mono, fontSize: "13px", color: C.text.secondary }}>{name}</span>
      <span style={{ fontFamily: FM.mono, fontSize: "12px", color }}>{level}%</span>
    </div>
    <div style={{ height: "3px", background: C.bg.raised, borderRadius: "2px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: visible ? `${level}%` : "0%", background: `linear-gradient(90deg,${color}88,${color})`, borderRadius: "2px", transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}55` }} />
    </div>
  </div>
);