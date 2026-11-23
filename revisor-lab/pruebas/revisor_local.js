#!/usr/bin/env node
/**
 * REVISOR LOCAL DETERMINISTA PARA UN EXPERIMENTO CONTROLADO.
 * NO es un LLM ni sustituye al subagente de Claude Code.
 * Lee UNA instrucción del prompt para suprimir hallazgos especulativos.
 */
const fs = require("node:fs");
const path = require("node:path");

function review(file, config) {
  const code = fs.readFileSync(file, "utf8");
  const instructions = fs.readFileSync(config, "utf8");
  const strict = instructions.includes("Si no hay evidencia concreta de un defecto");
  const name = path.normalize(file).replaceAll("\\", "/");
  const findings = [];
  const add = (codigo, gravedad, explicacion, verificable = true) => {
    if (verificable || !strict) findings.push({ codigo, gravedad, explicacion, verificable });
  };

  if (name.endsWith("/js/script.js") && /\.innerHTML\s*=\s*`/.test(code) && /\$\{hero\./.test(code)) {
    add("XSS_INNERHTML", "alta", "Valores de héroes traídos de la API se interpolan sin escapar en innerHTML.");
  }
  if (name.endsWith("/backend/config/database.js") && /user\s*:\s*["']root["']/.test(code) && /password\s*:\s*["']\s*["']/.test(code)) {
    add("CREDENCIALES_EN_CODIGO", "alta", "Acceso root y contraseña vacía definidos dentro del archivo.");
  }
  if (name.endsWith("/backend/repositories/heroRepository.js") && /db\.query\s*\(\s*`[^`]*\$\{/.test(code)) {
    add("INYECCION_SQL", "alta", "Una consulta SQL incluye variables mediante interpolación de cadenas; utilizar parámetros.");
  }

  // La primera versión genera estas críticas genéricas, aunque NO hay evidencia
  // de que deban aplicarse a un endpoint GET público y sin datos privados.
  if (name.endsWith("/backend/controllers/heroController.js") && /async function getHeroes\(req, res\)/.test(code)) {
    add("VALIDACION_NO_DEMOSTRADA", "baja", "El Controller podría requerir validaciones adicionales.", false);
  }
  if (name.endsWith("/backend/routes/heroRoutes.js") && /router\.get\(/.test(code)) {
    add("AUTENTICACION_NO_DEMOSTRADA", "baja", "La ruta podría necesitar autenticación.", false);
  }
  return { archivo: name, modo: strict ? "mejorado" : "original", hallazgos: findings };
}

if (require.main === module) {
  const [file, config] = process.argv.slice(2);
  if (!file || !config) {
    console.error("Uso: node revisor_local.js <archivo> <instrucciones.md>");
    process.exit(2);
  }
  try { process.stdout.write(JSON.stringify(review(file, config), null, 2) + "\n"); }
  catch (err) { console.error(err.stack); process.exit(1); }
}
module.exports = { review };
