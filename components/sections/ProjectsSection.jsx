"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, FM } from "../../styles/theme";
import { PROJECTS } from "../../data/projects";
import { SLabel, STitle, Tag, StatusBadge } from "../ui";

function KindBadge({ kind }) {
  const isReal = kind === "real";
  return (
    <span
      style={{
        fontFamily: FM.mono,
        fontSize: "9px",
        letterSpacing: ".1em",
        padding: "2px 8px",
        borderRadius: "3px",
        color: isReal ? C.accent.base : C.text.muted,
        border: `1px solid ${isReal ? C.accent.dim : C.bg.border}`,
        background: isReal ? C.accent.glow : "transparent",
      }}
    >
      {isReal ? "PROYECTO REAL" : "EJERCICIO"}
    </span>
  );
}

function ProjectCard({ p, onBlog }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ background: h ? C.bg.surface : C.bg.base, border: `1px solid ${h ? p.color + "44" : C.bg.border}`, borderRadius: "8px", padding: "28px", transition: "all .28s", transform: h ? "translateY(-4px)" : "none", boxShadow: h ? `0 16px 48px ${p.color}12` : "none", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "64px", height: "64px", background: `linear-gradient(225deg,${p.color}18 0%,transparent 60%)` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "10px", flexWrap: "wrap" }}>
        <h3 style={{ fontFamily: FM.display, color: C.text.primary, fontSize: "18px", fontWeight: 700 }}>{p.title}</h3>
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          <KindBadge kind={p.kind} />
          <StatusBadge status={p.status} />
        </div>
      </div>
      <p style={{ color: C.text.muted, fontSize: "14px", lineHeight: 1.75, marginBottom: "18px" }}>{p.desc}</p>
      <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "18px" }}>
        {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <span style={{ fontFamily: FM.mono, fontSize: "11px", color: C.text.faint }}>
          {p.lines ? <><span style={{ color: p.color + "88" }}>~/lines</span> {p.lines.toLocaleString()}</> : "\u00A0"}
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "none", border: `1px solid ${C.bg.border}`, color: C.text.muted, padding: "5px 14px", borderRadius: "3px", fontFamily: FM.mono, fontSize: "11px", cursor: "pointer", transition: "all .2s", letterSpacing: ".05em", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "88"; e.currentTarget.style.color = p.color; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.bg.border; e.currentTarget.style.color = C.text.muted; }}>
              ver sitio ↗
            </a>
          )}
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
    </div>
  );
}

export default function ProjectsSection() {
  const router = useRouter();
  const onBlog = (postId) => router.push(`/blog/${postId}`);

  return (
    <section id="projects" className="section-pad" style={{ maxWidth: "1140px", margin: "0 auto" }}>
      <SLabel>{"// 03 — PROYECTOS"}</SLabel>
      <STitle style={{ marginBottom: "56px" }}>Lo que construí</STitle>
      <div className="section-grid-projects">
        {PROJECTS.map(p => <ProjectCard key={p.id} p={p} onBlog={onBlog} />)}
      </div>
    </section>
  );
}
