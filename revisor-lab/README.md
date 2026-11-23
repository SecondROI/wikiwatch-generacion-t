# Laboratorio aislado: medir un revisor de código

**Este es un conjunto de 5 archivos de ejemplo reconstruidos y con errores intencionales.** No son el código funcional del proyecto. El laboratorio fue creado para practicar la consigna “Medí tu revisor”.

## Resultados existentes

Los resultados 3/5 → 5/5 de `pruebas/resultados.json` son de un **verificador determinista local**, no de un agente de IA. Para reproducir:

```bash
node revisor-lab/pruebas/ejecutar_pruebas.js
node --test revisor-lab/pruebas/validar.test.js
```

## Cómo completar la medición del subagente real

1. En Claude Code (o cliente compatible), usar el agente `revisor` definido en `.claude/agents/revisor.md`.
2. Copiar `versiones/revisor_antes.md` sobre `.claude/agents/revisor.md` y abrir un chat NUEVO.
3. Pedir al agente que revise por separado los cinco archivos del laboratorio, sin mostrar `pruebas/expectativas.json` ni los resultados anteriores.
4. Guardar el resultado para cada uno, identificar aciertos y falsos positivos.
5. Reemplazar el agente por `versiones/revisor_despues.md` (solo cambia una línea) y abrir OTRO chat NUEVO.
6. Repetir con los mismos cinco archivos, guardar las salidas y actualizar la tabla de `docs/05-agente-revisor.md` con los valores de IA observados.

**Prompt neutral por archivo:** «Revisá exclusivamente `revisor-lab/js/script.js` con el subagente `revisor`. Indicá solo hallazgos verificables con la ubicación y explicación, o “Sin hallazgos”. No edites el archivo». Adaptar la ruta para cada uno de los otros cuatro.

No uses el agente de IA para confirmar un score simulado; los dos scores son experimentos distintos. No conviertas el detector estático en supuesto resultado de IA.
