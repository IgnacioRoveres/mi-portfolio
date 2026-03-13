# mi portfolio

Portfolio personal que fui construyendo para tener un lugar donde mostrar mis proyectos y escribir sobre las cosas que aprendo. Incluye blog integrado con soporte para distintas categorías y un formulario de contacto funcional.

El diseño es oscuro con acento rojo carmesí, tipografía monoespaciada para el código y Syne para los títulos. Sin librerías de UI — todo está construido desde cero con React.

---

## stack

- React 18 + Vite
- Estilos inline / CSS global propio (sin Tailwind ni styled-components)
- JetBrains Mono + Syne vía Google Fonts
- Formspree para el formulario de contacto
- Sin dependencias de UI externas

---

## estructura del proyecto

```
src/
├── styles/
│   ├── theme.js            # colores y fuentes como constantes
│   └── globals.js          # CSS global, animaciones y media queries
├── data/
│   ├── personal.js         # nombre, bio, stats, redes sociales
│   ├── projects.js         # proyectos con tags, estado y link a post
│   ├── skills.js           # skills con nivel porcentual
│   └── blog.js             # posts con contenido en markdown básico
├── hooks/
│   ├── useTypingEffect.js  # efecto de tipeo animado
│   ├── useInView.js        # detecta cuando un elemento entra en viewport
│   └── useActiveSection.js # tracking de sección visible para el navbar
├── components/
│   ├── ui/                 # primitivos: SLabel, STitle, Tag, SkillBar, etc.
│   ├── layout/             # Navbar (con hamburguesa) y Footer
│   ├── sections/           # Hero, About, Skills, Projects, Contact
│   └── blog/               # BlogSection, BlogCard, BlogPost, CategoryFilter
└── pages/
    ├── HomePage.jsx
    └── BlogPostPage.jsx
```

---

## instalación

```bash
git clone https://github.com/tu-usuario/mi-portfolio.git
cd mi-portfolio
npm install
npm run dev
```

Para el build de producción:

```bash
npm run build
```

Genera una carpeta `dist/` con archivos estáticos listos para deployar en cualquier hosting.

---

## personalización

Todo el contenido está en `src/data/`. No hace falta tocar ningún componente para actualizarlo.

**`data/personal.js`** → nombre, bio, stats ("3+ años", etc.), links de redes sociales y email

**`data/projects.js`** → cada proyecto tiene título, descripción, tags, estado (LIVE / WIP / ARCHIVED), líneas de código y opcionalmente un `blogPostId` que lo vincula a un post del blog

**`data/skills.js`** → nombre de la tecnología, nivel del 0 al 100, y color hex para la barra

**`data/blog.js`** → posts con título, excerpt, categoría, fecha, tiempo de lectura y contenido en un formato de markdown básico (soporta `##`, `###`, bloques de código con triple backtick, `> citas` y `` `código inline` ``)

**`styles/theme.js`** → si querés cambiar la paleta de colores o las fuentes, todo está centralizado acá

---

## formulario de contacto

Usa [Formspree](https://formspree.io). El endpoint está en `ContactSection.jsx`:

```js
const FORMSPREE_URL = "https://formspree.io/f/xnjgvkvy";
```

Si querés usar tu propia cuenta, reemplazalo con el endpoint que te da Formspree al crear un nuevo form.

---

## deploy

**Vercel**
```bash
npm i -g vercel
vercel
```
Detecta Vite automáticamente, no hace falta configurar nada.

**Netlify**
Conectás el repo desde netlify.com, configurás el build command como `npm run build` y el publish directory como `dist`.

**GitHub Pages**
```bash
npm install -D gh-pages
```
Agregás en `package.json`:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```
Y deployás con:
```bash
npm run build && npm run deploy
```

---

## responsive

Tres breakpoints definidos en `globals.js`:

- `≤ 900px` — grillas pasan a una columna
- `≤ 768px` — navbar cambia a menú hamburguesa, paddings reducidos
- `≤ 480px` — botones del hero se apilan, ajustes para pantallas chicas

---

## licencia

MIT — hacé lo que quieras con el código.