export const BLOG_POSTS = [
{
  id:        "stack-cognitivo-aprendizaje-agentico",
  category:  "IA",
  readTime:  6,
  date:      "2026-03-24",
  projectId: 1,
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

**System prompt**: la instrucción maestra que define el comportamiento del modelo para toda la sesión. Bien configurado, actúa como guardrail: mantiene al modelo enfocado y lo protege contra prompt injection accidental.

Sin tener claro esto, terminás peleando contra la herramienta en lugar de usarla.

## El flujo en cuatro fases

### Fase 1 — Recolección

Usás **Deep Research** (Gemini o Perplexity) para capturar un ecosistema completo: repositorios, papers, documentación oficial, canales de YouTube enteros. El objetivo es volcar todo en un solo lugar antes de procesar nada.

### Fase 2 — Deduplicación contra tu base de conocimiento

Acá entra **Obsidian**. Tu vault es tu memoria externa. Con un script de Python, consolidás todas tus notas en un único archivo de contexto:

\`\`\`python
# consolidar_vault.py
import os
import re

VAULT_PATH = "/ruta/a/tu/vault"
OUTPUT_FILE = "contexto_usuario.txt"
EXCLUDE = [".obsidian", "attachments"]

def limpiar_frontmatter(texto):
    return re.sub(r"^---.*?---\n", "", texto, flags=re.DOTALL)

notas = []
for root, dirs, files in os.walk(VAULT_PATH):
    dirs[:] = [d for d in dirs if d not in EXCLUDE]
    for f in files:
        if f.endswith(".md"):
            with open(os.path.join(root, f), "r") as archivo:
                contenido = limpiar_frontmatter(archivo.read())
                notas.append(contenido)

with open(OUTPUT_FILE, "w") as salida:
    salida.write("\n\n---\n\n".join(notas))
\`\`\`

Ese \`contexto_usuario.txt\` lo inyectás como fuente en NotebookLM. A partir de ahí, el modelo sabe qué ya sabés y puede centrarse exclusivamente en los gaps.

### Fase 3 — Grounding

**NotebookLM** es la pieza crítica de esta fase. A diferencia de chatear con un modelo genérico, NotebookLM obliga a la IA a responder basándose solo en las fuentes que vos cargaste. Esto elimina alucinaciones y te da síntesis verificables.

Caso concreto: comparar tres frameworks o tecnologías que estás evaluando. Cargás la documentación oficial de cada uno, hacés las preguntas de comparación y obtenés una tabla de decisión en minutos, sin que el modelo mezcle información desactualizada de su entrenamiento.

### Fase 4 — Generación de activos

El conocimiento sintetizado se exporta a formatos de aprendizaje activo. Los que más uso:

- **Flashcards para Anki**: le pedís al modelo que tome los conceptos clave y los formatee como pares pregunta/respuesta en CSV. Importás directo.
- **Resúmenes de audio**: NotebookLM tiene una feature de podcast que convierte las fuentes en diálogo de audio. Útil para consumo asíncrono mientras hacés otra cosa.
- **Mapas mentales**: exportás la estructura jerárquica del tema como Markdown con indentación, que después abre cualquier herramienta de mindmap.

## Qué herramienta hace qué

No todas las herramientas son intercambiables. Esta es la división que uso:

| Herramienta | Función | Limitación |
|---|---|---|
| NotebookLM | Extracción y grounding sobre fuentes | Débil en redacción creativa larga |
| Gemini | Síntesis de alta escala, primer borrador | Riesgo de alucinación sin anclaje |
| Claude | Razonamiento, refactorización, código | Requiere supervisión en tareas críticas |

Usarlas bien significa no pedirle a Gemini que razone sobre tu código de producción, ni pedirle a NotebookLM que te escriba un artículo desde cero.

## El resultado en números

- Investigación de relocalización (impuestos, alquileres, conectividad en múltiples países): de 3 meses a 15 minutos.
- Comparación de specs técnicas entre decenas de modelos de hardware: 5 minutos.
- Libros con 90% de overlap con lo que ya tenés en Obsidian: detectados y descartados automáticamente.

El cuello de botella ya no es el acceso a la información. Es la capacidad de filtrar y procesar antes de que la información se vuelva obsoleta.

> La ventaja no está en quién tiene acceso a más datos, sino en quién tiene el sistema para destilarlos más rápido.`,
}
];