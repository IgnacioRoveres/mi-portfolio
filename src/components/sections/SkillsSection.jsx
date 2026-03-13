import { C } from "../../styles/theme";
import { SKILLS } from "../../data/skills";
import { SLabel, STitle, SkillBar } from "../ui";
import { useInView } from "../../hooks/useInView";

export default function SkillsSection() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="skills" ref={ref} className="section-pad" style={{ background: C.bg.surface, borderTop: `1px solid ${C.bg.border}`, borderBottom: `1px solid ${C.bg.border}` }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <SLabel>// 02 — SKILLS</SLabel>
        <STitle style={{ marginBottom: "72px" }}>Stack técnico</STitle>
        <div className="section-grid-skills">
          {SKILLS.map(s => <SkillBar key={s.name} {...s} visible={inView} />)}
        </div>
      </div>
    </section>
  );
}