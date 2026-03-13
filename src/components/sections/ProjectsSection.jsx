import { useState } from "react";
import { C, FM } from "../../styles/theme";
import { PROJECTS } from "../../data/projects";
import { SLabel, STitle, Tag, StatusBadge } from "../ui";

function ProjectCard({ p, onBlog }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ background: h ? C.bg.surface : C.bg.base, border: `1px solid ${h ? p.color + "44" : C.bg.border}`, borderRadius: "8px", padding: "28px", transition: "all .28s", transform: h ? "translateY(-4px)" : "none", boxShadow: h ? `0 16px 48px ${p.color}12` : "none", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "64px", height: "64px", background: `linear-gradient(225deg,${p.color}18 0%,transparent 60%)` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <h3 style={{ fontFamily: FM.display, color: C.text.primary, fontSize: "18px", fontWeight: 700 }}>{p.title}</h3>
        <StatusBadge status={p.status} />
      </div>
      <p style={{ color: C.text.muted, fontSize: "14px", lineHeight: 1.75, marginBottom: "18px" }}>{p.desc}</p>
      <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "18px" }}>
        {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: FM.mono, fontSize: "11px", color: C.text.faint }}>
          <span style={{ color: p.color + "88" }}>~/lines</span> {p.lines.toLocaleString()}
        </span>
        {p.blogPostId && (
          <button
            onClick={() => onBlog(p.blogPostId)}
            style={{ background: "none", border: `1px solid ${C.bg.border}`, color: C.text.muted, padding: "5px 14px", borderRadius: "3px", fontFamily: FM.mono, fontSize: "11px", cursor: "pointer", transition: "all .2s", letterSpacing: ".05em" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent.dim; e.currentTarget.style.color = C.accent.base; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.bg.border; e.currentTarget.style.color = C.text.muted; }}>
            leer post →
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection({ onBlog }) {
  return (
    <section id="projects" className="section-pad" style={{ maxWidth: "1140px", margin: "0 auto" }}>
      <SLabel>// 03 — PROYECTOS</SLabel>
      <STitle style={{ marginBottom: "56px" }}>Lo que construí</STitle>
      <div className="section-grid-projects">
        {PROJECTS.map(p => <ProjectCard key={p.id} p={p} onBlog={onBlog} />)}
      </div>
    </section>
  );
}