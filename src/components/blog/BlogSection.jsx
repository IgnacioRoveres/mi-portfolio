import { useState } from "react";
import { C, FM } from "../../styles/theme";
import { BLOG_POSTS } from "../../data/blog";
import { SLabel, STitle } from "../ui";
import { CategoryFilter } from "./CategoryFilter";
import { FeatCard, SmallCard } from "./BlogCard";

export default function BlogSection({ onOpen }) {
  const [ac, setAc] = useState("todos");
  const filtered = ac === "todos" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === ac);

  return (
    <section id="blog" className="section-pad" style={{ background: C.bg.surface, borderTop: `1px solid ${C.bg.border}` }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <SLabel>// 04 — BLOG</SLabel>
        <div className="blog-header">
          <STitle>Notas & artículos</STitle>
          <CategoryFilter active={ac} onChange={setAc} />
        </div>

        {filtered.length > 0 && <FeatCard post={filtered[0]} onOpen={onOpen} />}

        {filtered.length > 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "16px", marginTop: "16px" }}>
            {filtered.slice(1).map(p => <SmallCard key={p.id} post={p} onOpen={onOpen} />)}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", fontFamily: FM.mono, color: C.text.faint, fontSize: "13px" }}>
            No hay posts en esta categoría todavía.
          </div>
        )}
      </div>
    </section>
  );
}