import { useState, useEffect } from "react";

export function useTyping(strings, speed = 75, pause = 1800) {
  const [disp, setDisp] = useState("");
  const [si, setSi]     = useState(0);
  const [ci, setCi]     = useState(0);
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const cur = strings[si];
    let t;
    if (!del && ci < cur.length)        t = setTimeout(() => setCi(c => c + 1), speed);
    else if (!del && ci === cur.length)  t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0)             t = setTimeout(() => setCi(c => c - 1), speed / 2);
    else if (del && ci === 0)           { setDel(false); setSi(s => (s + 1) % strings.length); }
    setDisp(cur.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, si, strings, speed, pause]);

  return disp;
}