const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');
*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { overflow-x: hidden; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #08090f; }
::-webkit-scrollbar-thumb { background: #161825; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #c0182a66; }
::selection { background: #c0182a44; color: #f0eef5; }

@keyframes fadeUp   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
@keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes scanline { 0%{top:-2px} 100%{top:100%} }
@keyframes grid-drift { 0%{background-position:0 0} 100%{background-position:48px 48px} }
@keyframes pulse-ring {
  0%   { box-shadow:0 0 0 0 #c0182a88; }
  70%  { box-shadow:0 0 0 8px transparent; }
  100% { box-shadow:0 0 0 0 transparent; }
}

.fu1{animation:fadeUp .65s .10s ease both}
.fu2{animation:fadeUp .65s .22s ease both}
.fu3{animation:fadeUp .65s .34s ease both}
.fu4{animation:fadeUp .65s .46s ease both}
.fu5{animation:fadeUp .65s .58s ease both}

input,textarea,button{font-family:inherit;}
input:focus,textarea:focus{outline:none;}
textarea{resize:vertical;}

/* ── Navbar links ── */
.nb{background:none;border:none;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.07em;padding:4px 0;cursor:pointer;position:relative;transition:color .2s;}
.nb::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:#c0182a;transition:width .25s ease;}
.nb:hover::after,.nb.on::after{width:100%;}
.nb.on{color:#f0eef5!important;}
.nb:hover{color:#8b8fa8!important;}

/* ── Navbar hamburguesa: desktop muestra links, oculta icono ── */
.nav-links     { display:flex; gap:28px; }
.nav-hamburger { display:none !important; }

/* ── Secciones padding ── */
.section-pad { padding:120px 48px; }

/* ── Grillas ── */
.section-grid-2        { display:grid; grid-template-columns:1fr 1fr; gap:80px; }
.section-grid-projects { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.section-grid-skills   { display:grid; grid-template-columns:1fr 1fr; gap:0 96px; }

/* ── Hero ── */
.hero-btns  { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.hero-stats { display:flex; gap:56px; justify-content:center; margin-top:88px; }

/* ── Blog featured card ── */
.feat-card-inner { display:grid; grid-template-columns:1fr auto; gap:24px; align-items:center; }
.feat-card-meta  { text-align:right; flex-shrink:0; }

/* ── Blog header ── */
.blog-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:48px; flex-wrap:wrap; gap:20px; }

/* ══════════════════════════════════════
   TABLET  ≤ 900px
══════════════════════════════════════ */
@media (max-width: 900px) {
  .section-grid-2        { grid-template-columns:1fr; gap:48px; }
  .section-grid-projects { grid-template-columns:1fr; }
  .section-grid-skills   { grid-template-columns:1fr; gap:0; }
  .feat-card-inner       { grid-template-columns:1fr; }
  .feat-card-meta        { text-align:left; display:flex; gap:20px; align-items:center; }
}

/* ══════════════════════════════════════
   MOBILE  ≤ 768px
══════════════════════════════════════ */
@media (max-width: 768px) {
  /* Navbar */
  .nav-links     { display:none !important; }
  .nav-hamburger { display:flex !important; }

  /* Padding secciones */
  .section-pad { padding:72px 20px; }

  /* Hero */
  .hero-stats { gap:32px; margin-top:56px; }
}

/* ══════════════════════════════════════
   MOBILE CHICO  ≤ 480px
══════════════════════════════════════ */
@media (max-width: 480px) {
  .section-pad  { padding:56px 16px; }
  .hero-btns    { flex-direction:column; align-items:stretch; }
  .hero-btns button { text-align:center; }
  .hero-stats   { gap:20px; }
  .blog-header  { flex-direction:column; align-items:flex-start; }
}
`;

export default GCSS;