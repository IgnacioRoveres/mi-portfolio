# mi-portfolio (migrado a Next.js)

Portfolio personal — migrado de Create React App a **Next.js 15 (App Router)** para resolver problemas de SEO e indexación.

## Qué cambió respecto a la versión anterior

1. **Prerenderizado real (SSG).** Antes el HTML inicial venía vacío (`<div id="root"></div>`) porque todo se renderizaba con JavaScript en el navegador. Google y las previews de LinkedIn/WhatsApp no llegaban a ver el contenido. Ahora cada página se genera como HTML estático en el build.
2. **URLs reales para cada post del blog.** Antes todo el sitio vivía en una sola URL (`/`) y el "blog" era solo un cambio de estado interno de React — no se podía compartir ni indexar un post específico. Ahora cada post tiene su propia ruta: `/blog/como-construi-este-portfolio`, etc.
3. **Metadata y Open Graph por página.** Cada post de blog ahora genera su propio `<title>`, descripción y tags OG, en vez de repetir siempre los mismos metadatos genéricos de la home.
4. **Datos reales en vez de placeholders.** El email de contacto era literalmente `"tu@email.com"` y los links de redes eran `"#"`. Ya están con tus datos reales.
5. **Cerrajería SyF sumado como proyecto real**, separado y distinguido de los 4 proyectos de práctica (marcados como "EJERCICIO" en la UI).
6. **Se sacaron 2 links rotos**: `DevBoard` y `AuthKit` apuntaban a posts de blog que no existían.
7. **Fuentes optimizadas** con `next/font` (se auto-hospedan en el build, no dependen de una request externa a Google Fonts en cada carga).

## Stack

- Next.js 15 (App Router) + React 18
- Mismo sistema de diseño de antes: estilos inline + CSS global propio, JetBrains Mono + Syne

## Desarrollo local

```
npm install
npm run dev
```

## Build de producción

```
npm run build
```

## Deploy

Como ya tenés el proyecto conectado en Vercel (`mi-portfolio-ivr.vercel.app`), Vercel debería detectar automáticamente que ahora es un proyecto Next.js al hacer push. Si el build falla o usa configuración vieja de CRA, revisá en el dashboard de Vercel → Settings → Build & Development Settings que el Framework Preset diga **Next.js**.

## Pendiente / sugerido

- Revisar que el endpoint de Formspree en `components/sections/ContactSection.jsx` sea el tuyo.
- Considerar escribir un post de blog sobre Cerrajería SyF — es tu mejor caso real y todavía no tiene contenido asociado.
