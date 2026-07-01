"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { C, FM } from "../../styles/theme";

const NAV = [
  { l: "Inicio",    id: "hero"     },
  { l: "Sobre mí",  id: "about"    },
  { l: "Skills",    id: "skills"   },
  { l: "Proyectos", id: "projects" },
  { l: "Blog",      id: "blog"     },
  { l: "Contacto",  id: "contact"  },
];

export default function Navbar({ active, onNav }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleNav = (id) => {
    if (isHome && onNav) onNav(id);
    setOpen(false);
  };

  const NavItem = ({ l, id, mobile }) => {
    const isActive = active === id;
    const baseStyle = mobile
      ? {
          display: "block", width: "100%", textAlign: "left",
          background: "none", border: "none",
          fontFamily: FM.mono, fontSize: "13px", letterSpacing: ".07em",
          color: isActive ? C.accent.base : C.text.muted,
          padding: "14px 28px", cursor: "pointer",
          borderLeft: `2px solid ${isActive ? C.accent.base : "transparent"}`,
          transition: "all .15s", textDecoration: "none",
        }
      : { color: isActive ? C.text.primary : C.text.muted, textDecoration: "none" };

    if (isHome) {
      return (
        <button key={id} className={mobile ? undefined : `nb${isActive ? " on" : ""}`} onClick={() => handleNav(id)} style={baseStyle}>
          {l}
        </button>
      );
    }
    return (
      <Link key={id} href={`/#${id}`} className={mobile ? undefined : "nb"} onClick={() => setOpen(false)} style={baseStyle}>
        {l}
      </Link>
    );
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: `${C.bg.base}ee`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.bg.border}`, height: "58px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>

        {/* Logo */}
        {isHome ? (
          <button onClick={() => handleNav("hero")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FM.mono, fontSize: "14px", fontWeight: 600, color: C.accent.base, letterSpacing: ".05em" }}>
            &gt; dev.portfolio
          </button>
        ) : (
          <Link href="/" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FM.mono, fontSize: "14px", fontWeight: 600, color: C.accent.base, letterSpacing: ".05em", textDecoration: "none" }}>
            &gt; dev.portfolio
          </Link>
        )}

        {/* Links desktop — ocultos en mobile via clase */}
        <div className="nav-links">
          {NAV.map(({ l, id }) => <NavItem key={id} l={l} id={id} />)}
        </div>

        {/* Botón hamburguesa — visible solo en mobile */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Menú"
          style={{ background: "none", border: `1px solid ${open ? C.accent.dim : C.bg.border}`, borderRadius: "4px", padding: "6px 8px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", transition: "border-color .2s" }}
        >
          <span style={{ display: "block", width: "20px", height: "2px", background: open ? C.accent.base : C.text.muted, transition: "all .25s", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "20px", height: "2px", background: open ? C.accent.base : C.text.muted, transition: "all .25s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: "20px", height: "2px", background: open ? C.accent.base : C.text.muted, transition: "all .25s", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {/* Menú mobile desplegable */}
      <div style={{
        position: "fixed", top: "58px", left: 0, right: 0, zIndex: 199,
        background: `${C.bg.surface}fa`,
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.bg.border}`,
        overflow: "hidden",
        maxHeight: open ? "400px" : "0",
        transition: "max-height .35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: "12px 0 20px" }}>
          {NAV.map(({ l, id }) => <NavItem key={id} l={l} id={id} mobile />)}
        </div>
      </div>

      {/* Overlay para cerrar el menú */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 198, top: "58px" }}
        />
      )}
    </>
  );
}
