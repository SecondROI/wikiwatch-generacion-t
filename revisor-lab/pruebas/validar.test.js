const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { review } = require("./revisor_local.js");
const ROOT = path.resolve(__dirname,"..");
const cases = JSON.parse(fs.readFileSync(path.join(__dirname,"expectativas.json"),"utf8")).casos;

test("El archivo de predicciones contiene cinco casos (3 defectuosos + 2 sanos)", () => {
  assert.equal(cases.length,5);
  assert.equal(cases.filter(x=>x.esperado === "SIN_HALLAZGOS").length,2);
});

test("La única modificación del prompt está en una línea", () => {
  const old = fs.readFileSync(path.join(ROOT,"versiones/revisor_antes.md"),"utf8").trim().split("\n");
  const now = fs.readFileSync(path.join(ROOT,"versiones/revisor_despues.md"),"utf8").trim().split("\n");
  assert.equal(old.length,now.length);
  assert.equal(old.filter((s,i)=>s!==now[i]).length,1);
});

test("El revisor local original puntúa 3 de 5", () => {
  const matches = cases.filter(c=>{
    const result=review(path.join(ROOT,c.archivo),path.join(ROOT,"versiones/revisor_antes.md"));
    return result.hallazgos.map(x=>x.codigo).sort().join(",") === (c.esperado === "SIN_HALLAZGOS" ? "" : c.esperado);
  });
  assert.equal(matches.length,3);
});

test("El revisor local mejorado puntúa 5 de 5", () => {
  const matches = cases.filter(c=>{
    const result=review(path.join(ROOT,c.archivo),path.join(ROOT,"versiones/revisor_despues.md"));
    return result.hallazgos.map(x=>x.codigo).sort().join(",") === (c.esperado === "SIN_HALLAZGOS" ? "" : c.esperado);
  });
  assert.equal(matches.length,5);
});
