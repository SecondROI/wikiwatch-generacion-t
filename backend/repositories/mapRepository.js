const db = require('../config/database');

async function findAll() {
  const [rows] = await db.execute(`
    SELECT mapa_id, nombre, tipo, ubicacion, imagen, descripcion
    FROM mapas ORDER BY nombre ASC LIMIT 100
  `);
  return rows;
}
async function findById(id) {
  const [rows] = await db.execute('SELECT * FROM mapas WHERE mapa_id = ?', [id]);
  return rows[0] || null;
}
async function findModesForMap(id) {
  const [rows] = await db.execute(`
    SELECT m.modo_id, m.nombre, m.descripcion, m.cantidad_jugadores, m.objetivo
    FROM modos_juego m JOIN mapa_modo mm ON mm.modo_id = m.modo_id
    WHERE mm.mapa_id = ? ORDER BY m.nombre`, [id]);
  return rows;
}
async function findAllModes() {
  const [rows] = await db.execute('SELECT * FROM modos_juego ORDER BY nombre ASC LIMIT 100');
  return rows;
}
async function findModeById(id) {
  const [rows] = await db.execute('SELECT * FROM modos_juego WHERE modo_id = ?', [id]);
  return rows[0] || null;
}
async function findMapsForMode(id) {
  const [rows] = await db.execute(`
    SELECT p.mapa_id, p.nombre, p.tipo, p.ubicacion, p.imagen, p.descripcion
    FROM mapas p JOIN mapa_modo mm ON mm.mapa_id = p.mapa_id
    WHERE mm.modo_id = ? ORDER BY p.nombre`, [id]);
  return rows;
}
module.exports = { findAll, findById, findModesForMap, findAllModes, findModeById, findMapsForMode };
