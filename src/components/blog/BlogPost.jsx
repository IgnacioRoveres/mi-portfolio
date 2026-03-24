import { C, FM } from "../../styles/theme";
import { BLOG_POSTS } from "../../data/blog";
import { Tag } from "../ui";
import { CatPill } from "./CategoryFilter";

function parseInline(text, FM, C) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`)/g);
  return parts.map((pt, k) => {
    if (pt.startsWith("**") && pt.endsWith("**"))
      return <strong key={k} style={{ color: C.text.primary, fontWeight: 600 }}>{pt.slice(2, -2)}</strong>;
    if (pt.startsWith("_") && pt.endsWith("_"))
      return <em key={k} style={{ color: C.text.muted, fontStyle: "italic" }}>{pt.slice(1, -1)}</em>;
    if (pt.startsWith("`") && pt.endsWith("`"))
      return <code key={k} style={{ fontFamily: FM.mono, fontSize: "13px", background: C.bg.raised, border: `1px solid ${C.bg.border}`, padding: "1px 7px", borderRadius: "3px", color: C.accent.base }}>{pt.slice(1, -1)}</code>;
    return pt;
  });
}

function renderContent(content) {
  const blocks = content.trim().split(/(```[\s\S]*?```)/g);

  return blocks.map((block, i) => {

    if (block.startsWith("```")) {
      const lang = block.match(/^```(\w*)/)?.[1] || "";
      const code = block.replace(/^```\w*\n?/, "").replace(/```$/, "");
      return (
        <div key={i} style={{ margin: "24px 0" }}>
          {lang && (
            <div style={{ background: C.bg.border, padding: "4px 16px", borderRadius: "8px 8px 0 0", display: "inline-block", fontFamily: FM.mono, fontSize: "11px", color: C.text.faint, letterSpacing: ".05em" }}>
              {lang}
            </div>
          )}
          <div style={{ background: C.bg.surface, border: `1px solid ${C.bg.border}`, borderRadius: lang ? "0 8px 8px 8px" : "8px", padding: "20px", overflowX: "auto" }}>
            <pre style={{ fontFamily: FM.mono, fontSize: "13px", lineHeight: 1.8, color: C.text.secondary, margin: 0 }}>{code.trim()}</pre>
          </div>
        </div>
      );
    }

    const lines = block.trim().split("\n");
    const parseRow = (line) =>
      line.split("|").map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

    // Agrupar líneas en chunks: "line", "list" o "table"
    const otherLines = [];
    let listItems = [];
    let tableLines = [];
    let inList = false; 
    let inTable = false;  

    const flushList = (idx) => {
      if (listItems.length > 0) {
        otherLines.push({ type: "list", items: [...listItems], idx: `list-${idx}` });
        listItems = [];
        inList = false;
      }
    };
    const flushTable = (idx) => {
      if (tableLines.length >= 3) {
        const headers = parseRow(tableLines[0]);
        const rows = tableLines.slice(2).filter(l => l.trim().startsWith("|")).map(parseRow);
        otherLines.push({ type: "table", headers, rows, idx: `table-${idx}` });
      }
      tableLines = [];
      inTable = false;
    };

    lines.forEach((line, idx) => {
      const isTableRow = line.trim().startsWith("|");
      const isListRow  = line.trim().match(/^[-*] /);

      if (isTableRow) {
        flushList(idx);
        inTable = true;
        tableLines.push(line);
      } else if (isListRow) {
        flushTable(idx);
        inList = true;
        listItems.push({ idx, text: line.trim().slice(2) });
      } else {
        flushList(idx);
        flushTable(idx);
        otherLines.push({ type: "line", text: line, idx });
      }
    });
    flushList("end");
    flushTable("end");

    return otherLines.map((entry) => {
      if (entry.type === "table") {
        return (
          <div key={`${i}-${entry.idx}`} style={{ overflowX: "auto", margin: "24px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FM.mono, fontSize: "13px" }}>
              <thead>
                <tr>
                  {entry.headers.map((h, k) => (
                    <th key={k} style={{ textAlign: "left", padding: "10px 16px", borderBottom: `1px solid ${C.bg.border}`, color: C.text.primary, fontWeight: 600, background: C.bg.surface, whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entry.rows.map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: `1px solid ${C.bg.border}` }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: "10px 16px", color: C.text.muted, lineHeight: 1.7 }}>
                        {parseInline(cell, FM, C)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      if (entry.type === "list") {
        return (
          <ul key={`${i}-${entry.idx}`} style={{ margin: "12px 0 16px 0", paddingLeft: 0, listStyle: "none" }}>
            {entry.items.map((item, li) => (
              <li key={li} style={{ display: "flex", gap: "12px", color: C.text.muted, fontSize: "15px", lineHeight: 1.9, marginBottom: "6px" }}>
                <span style={{ color: C.accent.base, marginTop: "2px", flexShrink: 0 }}>—</span>
                <span>{parseInline(item.text, FM, C)}</span>
              </li>
            ))}
          </ul>
        );
      }

      const { text: line, idx: j } = entry;

      if (line.startsWith("## "))
        return <h2 key={`${i}-${j}`} style={{ fontFamily: FM.display, fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: C.text.primary, margin: "40px 0 16px", letterSpacing: "-.02em" }}>{line.slice(3)}</h2>;

      if (line.startsWith("### "))
        return <h3 key={`${i}-${j}`} style={{ fontFamily: FM.display, fontSize: "20px", fontWeight: 600, color: "#c8c5d4", margin: "28px 0 10px" }}>{line.slice(4)}</h3>;

      if (line.startsWith("> "))
        return <blockquote key={`${i}-${j}`} style={{ borderLeft: `3px solid ${C.accent.base}`, paddingLeft: "20px", margin: "24px 0", color: C.text.muted, fontStyle: "italic", fontSize: "16px", lineHeight: 1.8 }}>{parseInline(line.slice(2), FM, C)}</blockquote>;

      if (!line.trim())
        return <div key={`${i}-${j}`} style={{ height: "6px" }} />;

      return (
        <p key={`${i}-${j}`} style={{ color: C.text.muted, fontSize: "15px", lineHeight: 1.9, marginBottom: "10px" }}>
          {parseInline(line, FM, C)}
        </p>
      );
    });
  });
}

export default function BlogPost({ postId, onBack }) {
  const post = BLOG_POSTS.find(p => p.id === postId);
  if (!post) return null;
  const date = new Date(post.date).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div style={{ paddingTop: "58px", minHeight: "100vh" }}>
      <div style={{ background: C.bg.surface, borderBottom: `1px solid ${C.bg.border}`, padding: "clamp(40px,6vw,64px) clamp(16px,5vw,48px) clamp(36px,5vw,56px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%,${C.accent.glow} 0%,transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <button onClick={onBack}
            style={{ background: "none", border: "none", fontFamily: FM.mono, fontSize: "12px", color: C.text.muted, cursor: "pointer", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", padding: 0, letterSpacing: ".05em", transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.accent.base}
            onMouseLeave={e => e.currentTarget.style.color = C.text.muted}>
            ← volver al blog
          </button>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
            <CatPill cat={post.category} />
            <span style={{ fontFamily: FM.mono, fontSize: "11px", color: C.text.faint }}>{date} · {post.readTime} min de lectura</span>
          </div>
          <h1 style={{ fontFamily: FM.display, fontSize: "clamp(24px,5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", color: C.text.primary, lineHeight: 1.15, marginBottom: "18px" }}>
            {post.title}
          </h1>
          <p style={{ color: C.text.muted, fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.7 }}>{post.excerpt}</p>
          <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginTop: "22px" }}>
            {post.tags.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "clamp(40px,6vw,64px) clamp(16px,5vw,48px) 120px" }}>
        {renderContent(post.content)}
      </div>
    </div>
  );
}