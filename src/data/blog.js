export const BLOG_POSTS = [
  {
    id:        "como-construi-este-portfolio",
    category:  "proyecto",
    readTime:  12,
    date:      "2026-03-24",
    projectId: null,
    tags:      ["React", "CSS", "Arquitectura", "Performance"],
    title:     "Cómo construí este portfolio: decisiones técnicas y estructura",
    excerpt:   "Sin librerías de UI, sin Tailwind, sin magia. Todo el CSS está escrito a mano y cada componente tiene una razón de ser. Acá está el desglose técnico de cómo está armado.",
    content: `## El punto de partida

La idea era simple: un portfolio que no pareciera hecho con una plantilla. Eso implicaba tomar decisiones desde cero — paleta de colores, tipografía, animaciones, estructura de archivos. Sin Tailwind, sin componentes de terceros, sin nada que me sacara el control del resultado final.

El stack es React 18 con Create React App, estilos inline y un archivo de CSS global para lo que los estilos inline no pueden hacer: media queries, keyframes y pseudoclases.

## Arquitectura de archivos

La estructura está pensada para que agregar contenido no implique tocar código de componentes. Todo lo que cambia frecuentemente vive en \`src/data/\`:

\`\`\`
src/
├── styles/
│   ├── theme.js       # tokens de diseño
│   └── globals.js     # CSS global y animaciones
├── data/
│   ├── personal.js    # nombre, bio, redes
│   ├── projects.js    # proyectos
│   ├── skills.js      # stack con niveles
│   └── blog.js        # posts
├── hooks/             # lógica reutilizable
├── components/        # UI separada por responsabilidad
└── pages/             # composición de secciones
\`\`\`

Si mañana quiero agregar un proyecto, toco solo \`projects.js\`. Si quiero escribir un post, toco solo \`blog.js\`. Los componentes no necesitan saber de dónde vienen los datos.

## Sistema de diseño sin librería

En vez de instalar una librería de design tokens, definí todo en un objeto de JavaScript que se importa donde se necesita:

\`\`\`javascript
export const C = {
  bg: {
    base:    "#030508",
    surface: "#08090f",
    raised:  "#0d0f18",
    border:  "#161825",
  },
  accent: {
    base:   "#c0182a",
    bright: "#e0243a",
    dim:    "#8b1020",
    glow:   "#c0182a1a",
  },
  text: {
    primary:   "#f0eef5",
    secondary: "#8b8fa8",
    muted:     "#4a4e6a",
    faint:     "#1e2030",
  },
};
\`\`\`

Ventaja: es JavaScript puro, así que podés interpolarlo directamente en cualquier style prop sin conversiones. Las fuentes son dos: **JetBrains Mono** para todo lo técnico y **Syne** para títulos. La combinación define mucho del carácter visual.

## Animaciones

Hay tres animaciones principales en el Hero, definidas como keyframes en \`globals.js\` e inyectadas con un tag \`<style>\`:

**grid-drift** — la grilla de fondo se mueve en diagonal:

\`\`\`css
@keyframes grid-drift {
  0%   { background-position: 0 0; }
  100% { background-position: 48px 48px; }
}
\`\`\`

**scanline** — una línea que recorre la pantalla simulando un monitor CRT:

\`\`\`css
@keyframes scanline {
  0%   { top: -2px; }
  100% { top: 100%; }
}
\`\`\`

**pulse-ring** — el punto rojo del badge pulsa con un ring que se expande y desaparece:

\`\`\`css
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 #c0182a88; }
  70%  { box-shadow: 0 0 0 8px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
\`\`\`

Las animaciones de entrada usan clases \`fu1\` a \`fu5\` con delays escalonados de 120ms, creando el efecto de que los elementos aparecen en secuencia.

## Los tres hooks custom

### useTyping

Maneja el efecto de tipeo animado en el Hero. Cicla entre strings tipeando y borrando:

\`\`\`javascript
function useTyping(strings, speed = 75, pause = 1800) {
  const [si, setSi]   = useState(0);
  const [ci, setCi]   = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = strings[si];
    let t;
    if (!del && ci < cur.length)
      t = setTimeout(() => setCi(c => c + 1), speed);
    else if (!del && ci === cur.length)
      t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0)
      t = setTimeout(() => setCi(c => c - 1), speed / 2);
    else if (del && ci === 0) {
      setDel(false);
      setSi(s => (s + 1) % strings.length);
    }
    return () => clearTimeout(t);
  }, [ci, del, si]);
}
\`\`\`

El borrado es el doble de rápido que el tipeo para que no se sienta arrastrado.

### useInView

Detecta cuando un elemento entra en el viewport con IntersectionObserver. Lo uso en Skills para disparar las barras animadas solo cuando el usuario llega a esa sección. Una vez que \`inView\` pasa a \`true\`, no vuelve a \`false\` — la animación se dispara una sola vez.

### useActiveSection

Trackea qué sección está visible para resaltar el link del navbar. Crea un IntersectionObserver por cada sección y actualiza el estado activo cuando una entra en el viewport.

## Routing sin React Router

El portfolio tiene dos vistas: página principal y lectura de post. En vez de instalar React Router, el routing es estado en \`App.jsx\`:

\`\`\`javascript
const [view,   setView]   = useState("main"); // "main" | "post"
const [postId, setPostId] = useState(null);
\`\`\`

Para este caso de uso es suficiente y evita una dependencia extra.

## El renderer de markdown

Los posts usan un subset de markdown. El renderer parsea el \`content\` con split y mapea cada línea a JSX. Soporta \`##\`, \`###\`, bloques de código con triple backtick, \`> citas\` y \`código inline\`. Suficiente para posts técnicos sin parsear markdown completo.

## Responsive

Manejado con clases CSS en \`globals.js\`. Las secciones usan clases como \`section-pad\` en vez de estilos inline fijos:

\`\`\`css
.section-pad { padding: 120px 48px; }

@media (max-width: 768px) {
  .section-pad { padding: 72px 20px; }
}
@media (max-width: 480px) {
  .section-pad { padding: 56px 16px; }
}
\`\`\`

El navbar cambia a hamburguesa en pantallas menores a 768px usando \`max-height\` con transition para la animación de apertura.

## Formulario de contacto

Usa Formspree para no necesitar backend. El submit hace un \`fetch\` POST con los datos en JSON y maneja cuatro estados: \`idle\`, \`sending\`, \`sent\` y \`error\`.

## Deploy

El proyecto vive en GitHub y se deploya automáticamente en Vercel con cada push a \`main\`.`,
  },
  {
    id:        "stack-cognitivo-aprendizaje-agentico",
    category:  "tecnologia",
    readTime:  6,
    date:      "2026-03-24",
    projectId: null,
    tags:      ["IA", "Productividad", "NotebookLM", "Obsidian", "Aprendizaje"],
    title:     "Stack Cognitivo: cómo escalar tu aprendizaje con IA agéntica",
    excerpt:   "El consumo pasivo de información tiene un techo. Este es el flujo que uso para procesar en 15 minutos lo que antes me llevaba semanas, conectando NotebookLM, Obsidian y modelos de lenguaje en un pipeline que elimina redundancia y extrae solo lo que todavía no sé.",
    content: `## El problema con cómo aprendemos hoy

La mayoría de los devs aprendemos igual que en 2005: leemos tutoriales lineales, vemos videos y guardamos tabs. El resultado es deuda cognitiva acumulada: horas invertidas para retener un porcentaje mínimo de lo que realmente importa.

La IA no resuelve esto sola. Usada sin estructura, es otro vector de ruido. La clave está en armar un flujo donde cada herramienta cumpla una función específica y no se pisen entre sí.

## Los tres conceptos que tenés que dominar antes de empezar

Antes de hablar de herramientas, hay tres conceptos técnicos que cambian cómo diseñás el sistema:

**Tokens**: la unidad de cómputo de los modelos. Entender su peso te ayuda a predecir costo, velocidad y precisión en síntesis largas.

**Context window**: la "memoria de trabajo" del modelo. Ventanas grandes (Gemini llega a 2M de tokens) permiten procesar documentación completa sin que el modelo pierda el hilo.

**System prompt**: la instrucción maestra que define el comportamiento del modelo para toda la sesión. Bien configurado, actúa como guardrail contra prompt injection accidental.

Sin tener claro esto, terminás peleando contra la herramienta en lugar de usarla.

## El flujo en cuatro fases

### Fase 1 — Recolección

Usás **Deep Research** (Gemini o Perplexity) para capturar un ecosistema completo: repositorios, papers, documentación oficial, canales de YouTube enteros. El objetivo es volcar todo en un solo lugar antes de procesar nada.

### Fase 2 — Deduplicación contra tu base de conocimiento

Acá entra **Obsidian**. Tu vault es tu memoria externa. Con un script de Python, consolidás todas tus notas en un único archivo de contexto:

\`\`\`python
import os, re

VAULT_PATH  = "/ruta/a/tu/vault"
OUTPUT_FILE = "contexto_usuario.txt"
EXCLUDE     = [".obsidian", "attachments"]

def limpiar_frontmatter(texto):
    return re.sub(r"^---.*?---\n", "", texto, flags=re.DOTALL)

notas = []
for root, dirs, files in os.walk(VAULT_PATH):
    dirs[:] = [d for d in dirs if d not in EXCLUDE]
    for f in files:
        if f.endswith(".md"):
            with open(os.path.join(root, f), "r") as archivo:
                notas.append(limpiar_frontmatter(archivo.read()))

with open(OUTPUT_FILE, "w") as salida:
    salida.write("\n\n---\n\n".join(notas))
\`\`\`

Ese \`contexto_usuario.txt\` lo inyectás como fuente en NotebookLM. A partir de ahí, el modelo sabe qué ya sabés y se enfoca en los gaps.

### Fase 3 — Grounding

**NotebookLM** obliga a la IA a responder basándose solo en las fuentes que vos cargaste. Esto elimina alucinaciones y da síntesis verificables.

Caso concreto: comparar tres frameworks que estás evaluando. Cargás la documentación oficial de cada uno, hacés las preguntas y obtenés una tabla de decisión en minutos, sin que el modelo mezcle información desactualizada de su entrenamiento.

### Fase 4 — Generación de activos

El conocimiento sintetizado se exporta a formatos de aprendizaje activo:

- **Flashcards para Anki**: pares pregunta/respuesta en CSV, importás directo.
- **Resúmenes de audio**: NotebookLM convierte las fuentes en diálogo de audio.
- **Mapas mentales**: Markdown con indentación jerárquica que abre cualquier herramienta de mindmap.

## Qué herramienta hace qué

\`\`\`
NotebookLM → extracción y grounding sobre fuentes propias
Gemini     → síntesis de alta escala, primer borrador
Claude     → razonamiento, refactorización, código
\`\`\`

Usarlas bien significa no pedirle a Gemini que razone sobre tu código de producción, ni pedirle a NotebookLM que escriba un artículo desde cero.

## El resultado en números

- Investigación de relocalización (impuestos, alquileres, conectividad en múltiples países): de 3 meses a 15 minutos.
- Comparación de specs técnicas entre decenas de modelos de hardware: 5 minutos.
- Libros con 90% de overlap con lo que ya tenés en Obsidian: detectados y descartados automáticamente.

El cuello de botella ya no es el acceso a la información. Es la capacidad de filtrar y procesar antes de que se vuelva obsoleta.

> La ventaja no está en quién tiene acceso a más datos, sino en quién tiene el sistema para destilarlos más rápido.`,
  },
];