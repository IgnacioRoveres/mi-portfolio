import { useState } from "react";
import { C, FM }    from "./styles/theme";
import GCSS          from "./styles/globals";
import { useActiveSection } from "./hooks/useActiveSection";
import Navbar        from "./components/layout/Navbar";
import HomePage      from "./pages/HomePage";
import BlogPostPage  from "./pages/BlogPostPage";

const SECTION_IDS = ["hero", "about", "skills", "projects", "blog", "contact"];

export default function App() {
  const [view,   setView]   = useState("main");
  const [postId, setPostId] = useState(null);
  const active = useActiveSection(SECTION_IDS);

  const goTo = (id) => {
    if (view !== "main") {
      setView("main");
      setPostId(null);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openPost = (id) => {
    setPostId(id);
    setView("post");
    window.scrollTo({ top: 0 });
  };

  const backBlog = () => {
    setView("main");
    setPostId(null);
    setTimeout(() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <div style={{ background: C.bg.base, color: C.text.primary, fontFamily: FM.display, minHeight: "100vh" }}>
      <style>{GCSS}</style>
      <Navbar active={view === "post" ? "blog" : active} onNav={goTo} />
      {view === "post"
        ? <BlogPostPage postId={postId} onBack={backBlog} />
        : <HomePage onNav={goTo} onOpenPost={openPost} />
      }
    </div>
  );
}