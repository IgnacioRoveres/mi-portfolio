# mi portfolio

Portfolio personal de Ignacio Roveres. Muestra proyectos, stack técnico y un blog integrado con soporte para distintas categorías.

El diseño es oscuro con acento rojo carmesí, tipografía monoespaciada para el código y Syne para los títulos. Sin librerías de UI — todo está construido desde cero con React.

---

## stack

- Next.js 15 (App Router) + React 18
- Estilos inline / CSS global propio (sin Tailwind ni styled-components)
- JetBrains Mono + Syne, auto-hospedadas con `next/font`
- Formspree para el formulario de contacto

---

## estructura del proyecto

```
app/
├── layout.jsx           # layout raíz, fuentes y metadata base
├── globals.css           # estilos globales, animaciones y media queries
├── page.jsx               # home
└── blog/
    └── [id]/page.jsx       # página de cada post, generada estáticamente
components/
├── ui/                    # primitivos: SLabel, STitle, Tag, SkillBar, etc.
├── layout/                # Navbar y Footer
├── sections/              # Hero, About, Skills, Projects, Contact
├── blog/                  # BlogSection, BlogCard, BlogPost, CategoryFilter
└── HomeClient.jsx         # composición de la home (navbar + scroll spy)
data/
├── personal.js            # nombre, bio, stats, redes sociales
├── projects.js             # proyectos con tags, estado y link a post
├── skills.js                # skills con nivel porcentual
└── blog.js                  # posts con contenido en markdown básico
hooks/
├── useTypingEffect.js      # efecto de tipeo animado
├── useInView.js             # detecta cuando un elemento entra en viewport
└── useActiveSection.js       # tracking de sección visible para el navbar
styles/
└── theme.js                 # colores y fuentes como constantes
```

---

## instalación

```
git clone https://github.com/IgnacioRoveres/mi-portfolio.git
cd mi-portfolio
npm install
npm run dev
```

Para el build de producción:

```
npm run build
```

---

## personalización

Todo el contenido está en `data/`. No hace falta tocar ningún componente para actualizarlo.

**`data/personal.js`** → nombre, bio, stats ("1-2 años exp.", etc.), links de redes sociales y email

**`data/projects.js`** → cada proyecto tiene título, descripción, tags, estado (LIVE / WIP / ARCHIVED), tipo (`real` / `practice`), y opcionalmente `liveUrl` (link al sitio en producción) y `blogPostId` (link a un post del blog)

**`data/skills.js`** → nombre de la tecnología, nivel del 0 al 100, y color hex para la barra

**`data/blog.js`** → posts con título, excerpt, categoría, fecha, tiempo de lectura y contenido en un formato de markdown básico (soporta `##`, `###`, bloques de código con triple backtick, `> citas` y `` `código inline` ``)

**`styles/theme.js`** → si querés cambiar la paleta de colores o las fuentes, todo está centralizado acá

---

## formulario de contacto

Usa [Formspree](https://formspree.io). El endpoint está en `components/sections/ContactSection.jsx`:

```
const FORMSPREE_URL = "https://formspree.io/f/xnjgvkvy";
```

Si querés usar tu propia cuenta, reemplazalo con el endpoint que te da Formspree al crear un nuevo form.

---

## deploy

**Vercel**

```
npm i -g vercel
vercel
```

Detecta Next.js automáticamente, no hace falta configurar nada.

**Netlify** Conectás el repo desde netlify.com, configurás el build command como `npm run build`.

---

## responsive

Tres breakpoints definidos en `globals.css`:

- `≤ 900px` — grillas pasan a una columna
- `≤ 768px` — navbar cambia a menú hamburguesa, paddings reducidos
- `≤ 480px` — botones del hero se apilan, ajustes para pantallas chicas

---

## licencia

MIT — hacé lo que quieras con el código.