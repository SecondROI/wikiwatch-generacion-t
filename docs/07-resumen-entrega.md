# 7. Resumen del TP final para el Campus GT

**Proyecto:** WikiWatch — Wiki de Overwatch.

**Objetivo:** crear una aplicación web que permita consultar información de héroes, habilidades, perks, mapas y modos de juego, con búsqueda, filtros y favoritos persistidos en MySQL.

**Tecnologías:** HTML, CSS, JavaScript, Node.js, Express, MySQL, Fetch API y tests con Node.

**Módulo frontend:** interfaz responsiva, render de tarjetas, filtros, favoritos y manejo de estados visuales.

**Refactoring:** `showHeroes()` fue separado del armado de la tarjeta `createHeroCard()`. Incluye cuatro tests sobre renderizado (dos elementos, lista vacía, un elemento y tipo inválido).

**Backend:** se eligió Routes → Controllers → Services → Repositories. Se implementó `GET /api/heroes` con acceso SQL, más detalle de héroe, mapas, modos y favoritos. Se documentaron endpoints, validaciones y responsabilidades.

**IA crítica:** se corrigieron propuestas iniciales sobre fecha de nacimiento, habilidades, perks, descripción, estado, imágenes y opciones de perks.

**Agente revisor:** se creó `.claude/agents/revisor.md` y se incluyó laboratorio de medición. Los resultados locales demostrativos 3/5 → 5/5 no deben confundirse con dos corridas de IA.

**Evidencia automatizada:** se ejecutaron 19 pruebas y pasaron las 19 (ver `docs/test-results.txt`).

**Para completar la entrega:** verificar MySQL + Express en el equipo del alumno, publicar el proyecto en un repositorio GitHub real, pegar su URL en el Campus GT y, si la actividad se evalúa como evidencia obligatoria, ejecutar el revisor de IA en dos chats nuevos.

**Texto breve para Campus GT (completar al publicar):**

> Adjunto el enlace al repositorio de mi trabajo práctico final **WikiWatch**. Es una aplicación web con frontend HTML/CSS/JavaScript, backend Node.js/Express, base de datos MySQL, pruebas automatizadas y documentación de refactorización, arquitectura y uso crítico de IA. Repositorio: [PEGAR URL REAL DEL REPOSITORIO].
