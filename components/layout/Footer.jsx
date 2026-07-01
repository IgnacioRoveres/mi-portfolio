import { C, FM } from "../../styles/theme";
import { PERSON } from "../../data/personal";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.bg.border}`, padding: "22px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bg.surface }}>
      <span style={{ fontFamily: FM.mono, fontSize: "11px", color: C.text.faint }}>© 2026 — {PERSON.name}</span>
      <span style={{ fontFamily: FM.mono, fontSize: "11px", color: C.text.faint }}>built with React</span>
    </footer>
  );
}