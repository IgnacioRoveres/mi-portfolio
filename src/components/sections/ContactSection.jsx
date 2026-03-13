import { useState } from "react";
import { C, FM } from "../../styles/theme";
import { PERSON } from "../../data/personal";
import { SLabel, STitle } from "../ui";

// ─── Reemplazá esto con tu endpoint de Formspree ───────
const FORMSPREE_URL = "https://formspree.io/f/xnjgvkvy";
// ───────────────────────────────────────────────────────

function SocialLink({ name, href }) {
  const [h, setH] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ fontFamily: FM.mono, fontSize: "12px", color: h ? C.accent.base : C.text.faint, letterSpacing: ".06em", transition: "color .2s", textTransform: "capitalize" }}>
      {name}
    </a>
  );
}

export default function ContactSection() {
  const [form, setForm]       = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus]   = useState("idle"); // idle | sending | sent | error
  const [focused, setFocused] = useState(null);
  const [hS, setHS]           = useState(false);

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.mensaje) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          nombre:  form.nombre,
          email:   form.email,
          mensaje: form.mensaje,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ nombre: "", email: "", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const iStyle = (k) => ({
    width: "100%", background: C.bg.raised,
    border: `1px solid ${focused === k ? C.accent.dim : C.bg.border}`,
    borderRadius: "4px", padding: "12px 16px",
    color: C.text.primary, fontFamily: FM.mono,
    fontSize: "13px", transition: "border-color .2s",
  });

  const sending = status === "sending";

  return (
    <section id="contact" className="section-pad" style={{ borderTop: `1px solid ${C.bg.border}` }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
        <SLabel>{"// 05 — CONTACTO"}</SLabel>
        <STitle style={{ marginBottom: "14px" }}>Hablemos</STitle>
        <p style={{ color: C.text.muted, fontSize: "15px", lineHeight: 1.7, marginBottom: "48px" }}>
          ¿Tenés un proyecto en mente o querés charlar? Escribime.
        </p>

        <div style={{ background: C.bg.surface, border: `1px solid ${C.bg.border}`, borderRadius: "8px", padding: "40px 32px", textAlign: "left" }}>

          {/* ── Enviado OK ── */}
          {status === "sent" ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontFamily: FM.mono, fontSize: "36px", color: C.accent.base, marginBottom: "16px" }}>✓</div>
              <p style={{ color: C.text.secondary, fontFamily: FM.mono, fontSize: "13px" }}>
                Mensaje enviado. Te respondo pronto.
              </p>
            </div>

          ) : (
            <>
              {/* ── Error ── */}
              {status === "error" && (
                <div style={{ background: "#c0182a18", border: "1px solid #c0182a44", borderRadius: "4px", padding: "12px 16px", marginBottom: "20px", fontFamily: FM.mono, fontSize: "12px", color: "#e0243a" }}>
                  Algo salió mal. Intentá de nuevo o escribime directo a {PERSON.social.email}.
                </div>
              )}

              {/* ── Campos ── */}
              {[
                { k: "nombre", l: "Nombre", t: "text",  ph: "Tu nombre"    },
                { k: "email",  l: "Email",  t: "email", ph: "tu@email.com" },
              ].map(({ k, l, t, ph }) => (
                <div key={k} style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontFamily: FM.mono, fontSize: "11px", color: C.text.muted, letterSpacing: ".1em", marginBottom: "7px" }}>{l}</label>
                  <input type={t} placeholder={ph} value={form[k]}
                    onChange={e => setForm({ ...form, [k]: e.target.value })}
                    onFocus={() => setFocused(k)} onBlur={() => setFocused(null)}
                    disabled={sending}
                    style={{ ...iStyle(k), opacity: sending ? 0.6 : 1 }} />
                </div>
              ))}

              <div style={{ marginBottom: "26px" }}>
                <label style={{ display: "block", fontFamily: FM.mono, fontSize: "11px", color: C.text.muted, letterSpacing: ".1em", marginBottom: "7px" }}>Mensaje</label>
                <textarea rows={5} placeholder="Contame sobre tu proyecto..."
                  value={form.mensaje}
                  onChange={e => setForm({ ...form, mensaje: e.target.value })}
                  onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                  disabled={sending}
                  style={{ ...iStyle("msg"), opacity: sending ? 0.6 : 1 }} />
              </div>

              <button
                onClick={handleSubmit}
                disabled={sending}
                onMouseEnter={() => !sending && setHS(true)}
                onMouseLeave={() => setHS(false)}
                style={{ width: "100%", background: sending ? C.accent.dim : (hS ? C.accent.bright : C.accent.base), color: C.text.primary, border: "none", borderRadius: "4px", padding: "14px", fontFamily: FM.mono, fontSize: "12px", fontWeight: 700, letterSpacing: ".12em", transition: "all .2s", boxShadow: hS && !sending ? `0 0 24px ${C.accent.base}55` : "none", cursor: sending ? "not-allowed" : "pointer" }}>
                {sending ? "ENVIANDO..." : "ENVIAR MENSAJE →"}
              </button>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "34px", flexWrap: "wrap" }}>
          {Object.entries(PERSON.social).map(([k, v]) => (
            <SocialLink key={k} name={k} href={v} />
          ))}
        </div>
      </div>
    </section>
  );
}