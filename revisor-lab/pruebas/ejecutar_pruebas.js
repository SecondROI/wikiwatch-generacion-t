#!/usr/bin/env node
/**
 * Dos corridas de un verificador de laboratorio en procesos aislados.
 * NO son dos sesiones de chat de un modelo de IA.
 */
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const cases = JSON.parse(fs.readFileSync(path.join(__dirname, "expectativas.json"), "utf8")).casos;
const runs = [
  { id: "corrida_1", config: "versiones/revisor_antes.md" },
  { id: "corrida_2", config: "versiones/revisor_despues.md" }
];
const outputs = {};

for (const run of runs) {
  const directory = path.join(__dirname, "salidas", run.id);
  fs.mkdirSync(directory, { recursive: true });
  let successes = 0;
  const rows = [];
  console.log(`\n${run.id} (${run.config})`);
  for (const [i, c] of cases.entries()) {
    const child = spawnSync(process.execPath, [
      path.join(__dirname, "revisor_local.js"),
      path.join(ROOT, c.archivo),
      path.join(ROOT, run.config)
    ], { encoding: "utf8" });
    if (child.status !== 0) throw new Error(`${c.archivo}: ${child.stderr || child.stdout}`);
    const result = JSON.parse(child.stdout);
    const codes = result.hallazgos.map(f => f.codigo);
    const expected = c.esperado === "SIN_HALLAZGOS" ? [] : [c.esperado];
    const accurate = JSON.stringify([...codes].sort()) === JSON.stringify([...expected].sort());
    successes += Number(accurate);
    rows.push({ archivo: c.archivo, esperado: c.esperado, observado: codes, acerto: accurate });
    fs.writeFileSync(path.join(directory, `${i+1}_${path.basename(c.archivo)}.json`), JSON.stringify(result, null, 2) + "\n");
    console.log(`${accurate ? "ACIERTO" : "ERROR  "} | ${c.archivo} | Esperado ${expected.join(",") || "Sin hallazgos"} | Observado ${codes.join(",") || "Sin hallazgos"}`);
  }
  outputs[run.id] = { revision: run.config, aciertos: successes, total: cases.length, filas: rows };
  console.log(`TOTAL ${run.id}: ${successes}/${cases.length}`);
}
outputs.tipo_de_prueba = "Revisión determinista local; no es una ejecución del agente con IA en chats nuevos";
outputs.cambio_unico = "Se añadió, en la última línea del prompt, la orden de no informar problemas sin evidencia verificable.";
fs.writeFileSync(path.join(__dirname, "resultados.json"), JSON.stringify(outputs, null, 2) + "\n");
console.log("\nCambios de puntaje:", outputs.corrida_2.aciertos - outputs.corrida_1.aciertos);
