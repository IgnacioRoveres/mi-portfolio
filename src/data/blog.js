export const BLOG_POSTS = [
  {
    id:        "devboard-architecture",
    category:  "proyecto",
    readTime:  8,
    date:      "2026-02-18",
    projectId: "devboard",
    tags:      ["React", "WebSockets", "Redis", "Node.js"],
    title:     "Cómo diseñé la arquitectura real-time de DevBoard",
    excerpt:   "WebSockets, Redis pub/sub y un sistema de colas que no explota bajo carga. Lo que aprendí construyendo un dashboard en tiempo real.",
    content: `## El problema

Cuando empecé DevBoard quería algo simple: ver el estado de mis repos en tiempo real. Lo que no esperaba era que "tiempo real" escondía una caja de Pandora de decisiones de arquitectura.

## WebSockets vs SSE vs Polling

La primera decisión fue el protocolo. Estuve entre tres opciones:

\`\`\`
Polling           → simple, pero ineficiente
Server-Sent Events → unidireccional, suficiente para muchos casos
WebSockets        → bidireccional, más complejo, más potente
\`\`\`

Para DevBoard necesitaba bidireccionalidad, así que elegí WebSockets con \`ws\` en Node.js.

## El problema de escala

Con un solo servidor, WebSockets funciona bien. El problema llega cuando necesitás más de una instancia.

La solución: Redis pub/sub como bus de mensajes.

\`\`\`javascript
subscriber.subscribe('repo-events', (message) => {
  const event = JSON.parse(message);
  broadcastToSubscribers(event);
});
\`\`\`

## Lo que aprendí

> La arquitectura real-time no es difícil. Lo difícil es decidir cuánta complejidad estás dispuesto a manejar.`,
  },
  {
    id:        "authkit-passkeys",
    category:  "proyecto",
    readTime:  6,
    date:      "2026-01-30",
    projectId: "authkit",
    tags:      ["WebAuthn", "Passkeys", "Security", "UX"],
    title:     "Implementando Passkeys en 2026: lo que nadie te dice",
    excerpt:   "WebAuthn ya es mainstream. Pero la UX de passkeys todavía tiene aristas. Acá está lo que tuve que resolver para AuthKit.",
    content: `## Passkeys están en todas partes… casi

Los navegadores modernos soportan WebAuthn. Los dispositivos también. El problema es que la experiencia del usuario es inconsistente según el OS y el gestor de credenciales.

## El flujo básico

\`\`\`javascript
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: serverChallenge,
    rp: { name: "AuthKit", id: "authkit.dev" },
    user: { id: userId, name: userEmail, displayName: userName },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }],
  }
});
\`\`\`

## Los problemas reales

El mayor dolor de cabeza fue la sincronización cross-device. Un passkey creado en iOS no aparece automáticamente en Android.

La solución: permitir múltiples passkeys por cuenta y ofrecer un fallback explícito siempre visible.

> Implementá passkeys como opción adicional, no como reemplazo de passwords.`,
  },
  {
    id:        "react-server-components-2026",
    category:  "tecnologia",
    readTime:  10,
    date:      "2026-03-01",
    projectId: null,
    tags:      ["React", "RSC", "Next.js", "Performance"],
    title:     "React Server Components en producción: 6 meses después",
    excerpt:   "Los usé en un proyecto real, con carga real. Acá está el balance honesto — lo bueno, lo malo y lo que todavía no funciona bien.",
    content: `## El contexto

Migré un dashboard de analytics a React Server Components hace seis meses. No era un proyecto de juguete: 200k usuarios activos, queries complejas, mucho estado compartido.

## Lo que funcionó muy bien

Fetching de datos sin boilerplate. Poder hacer \`await db.query()\` directamente en el componente es genuinamente transformador.

\`\`\`jsx
async function Dashboard({ userId }) {
  const data = await db.analytics.findMany({ where: { userId } });
  return <Charts data={data} />;
}
\`\`\`

## Lo que fue complicado

La frontera entre Server y Client Components requiere disciplina. Es fácil romper el árbol de componentes sin darte cuenta.

## Mi veredicto

> RSC valen la pena para apps con mucho data-fetching del lado servidor. Para apps altamente interactivas, la fricción todavía no justifica el salto.`,
  },
  {
    id:        "typescript-strict-mode",
    category:  "tecnologia",
    readTime:  5,
    date:      "2026-02-05",
    projectId: null,
    tags:      ["TypeScript", "DX", "Best Practices"],
    title:     "Por qué activé strict mode en TypeScript y no volví atrás",
    excerpt:   "Durante un año evité el modo estricto. Después lo activé en un proyecto existente. Fue doloroso. También fue lo mejor que hice.",
    content: `## El miedo al strict mode

\`strict: true\` en \`tsconfig.json\` activa checks que muchos evitan porque "agregan ruido". Yo también lo evitaba.

## Qué activa

\`\`\`json
{
  "strictNullChecks": true,
  "noImplicitAny": true,
  "strictFunctionTypes": true
}
\`\`\`

## El momento en que cambié de opinión

Encontré un bug en producción que \`strictNullChecks\` hubiera atrapado en compile time. Era un \`undefined\` que llegaba a una función que asumía un valor definido.

## La migración

Activar strict en un proyecto existente grande es una tarea. Mi estrategia: activar flag por flag, no todo junto.

> El dolor de la migración dura días. Los bugs que previene duran para siempre.`,
  },
];