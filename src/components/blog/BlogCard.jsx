import { useState } from "react";
import { C, FM } from "../../styles/theme";
import { Tag } from "../ui";
import { CatPill, PostMeta } from "./CategoryFilter";

export function FeatCard({ post, onOpen }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={() => onOpen(post.id)}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="feat-card"
      style={{ background: h ? C.bg.raised : C.bg.base, border: `1px solid ${h ? C.accent.dim : C.bg.border}`, borderRadius: "8px", padding: "36px", cursor: "pointer", transition: "all .25s", marginBottom: "16px" }}>
      <div className="feat-card-inner">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
            <CatPill cat={post.category} />
            <span style={{ fontFamily: FM.mono, fontSize: "10px", color: C.text.faint, letterSpacing: ".12em" }}>DESTACADO</span>
          </div>
          <h3 style={{ fontFamily: FM.display, fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 700, color: C.text.primary, marginBottom: "10px", letterSpacing: "-.02em", lineHeight: 1.25 }}>
            {post.title}
          </h3>
          <p style={{ color: C.text.muted, fontSize: "14px", lineHeight: 1.75, marginBottom: "18px", maxWidth: "520px" }}>
            {post.excerpt}
          </p>
          <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
            {post.tags.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
        <div className="feat-card-meta">
          <PostMeta post={post} />
          <div style={{ marginTop: "20px", fontFamily: FM.mono, fontSize: "12px", color: h ? C.accent.base : C.text.faint, transition: "color .2s", letterSpacing: ".05em" }}>
            leer →
          </div>
        </div>
      </div>
    </div>
  );
}

export function SmallCard({ post, onOpen }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={() => onOpen(post.id)}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ background: h ? C.bg.raised : C.bg.base, border: `1px solid ${h ? C.bg.borderHover : C.bg.border}`, borderRadius: "8px", padding: "26px", cursor: "pointer", transition: "all .22s", transform: h ? "translateY(-3px)" : "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <CatPill cat={post.category} />
        <PostMeta post={post} />
      </div>
      <h3 style={{ fontFamily: FM.display, fontSize: "17px", fontWeight: 700, color: C.text.primary, marginBottom: "10px", lineHeight: 1.3, letterSpacing: "-.01em" }}>
        {post.title}
      </h3>
      <p style={{ color: C.text.muted, fontSize: "13px", lineHeight: 1.7, marginBottom: "16px" }}>
        {post.excerpt}
      </p>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {post.tags.slice(0, 3).map(t => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  );
}