import { C, FM } from "../../styles/theme";
import { PERSON } from "../../data/personal";
import { SLabel, STitle, TermWin } from "../ui";

export default function AboutSection() {
  return (
    <section id="about" className="section-pad" style={{ maxWidth: "1140px", margin: "0 auto" }}>
      <div className="section-grid-2" style={{ alignItems: "center" }}>
        <div>
          <SLabel>// 01 — SOBRE MÍ</SLabel>
          <STitle style={{ marginBottom: "28px" }}>
            Código que<br />
            <span style={{ color: C.accent.base }}>importa.</span>
          </STitle>
          {PERSON.bio.map((p, i) => (
            <p key={i} style={{ color: C.text.muted, fontSize: "15px", lineHeight: 1.9, marginBottom: "16px" }}>{p}</p>
          ))}
        </div>
        <TermWin title="about.json">
          <pre style={{ fontFamily: FM.mono, fontSize: "13px", lineHeight: 2, color: C.text.muted, whiteSpace: "pre-wrap" }}>
            <span>{"{\n"}</span>
            {[["nombre", `"${PERSON.name}"`], ["ubicación", `"${PERSON.location}"`], ["rol", `"${PERSON.role}"`], ["disponible", "true"]].map(([k, v]) => (
              <span key={k}>
                {"  "}<span style={{ color: C.accent.base }}>"{k}"</span>{": "}
                <span style={{ color: v === "true" ? C.accent.base : "#d4a047" }}>{v}</span>{",\n"}
              </span>
            ))}
            {"  "}<span style={{ color: C.accent.base }}>"intereses"</span>{": [\n"}
            {["open source", "developer tools", "automatización"].map(s => (
              <span key={s}>{"    "}<span style={{ color: "#d4a047" }}>"{s}"</span>{",\n"}</span>
            ))}
            {"  ]\n}"}
          </pre>
        </TermWin>
      </div>
    </section>
  );
}