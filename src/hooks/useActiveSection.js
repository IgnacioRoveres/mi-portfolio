import { useState, useEffect } from "react";

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.25 }
      );
      o.observe(el);
      return o;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [ids]);

  return active;
}