const db = require('../config/database');

async function findAll() {
  const [rows] = await db.execute(`
    SELECT h.heroe_id, h.nombre, h.rol, h.nacionalidad, h.fecha_nacimiento,
           h.descripcion, h.imagen, h.vida, h.dificultad
    FROM favoritos f JOIN heroes h ON h.heroe_id = f.heroe_id
    ORDER BY h.nombre ASC
  `);
  return rows;
}
async function exists(heroId) {
  const [rows] = await db.execute('SELECT 1 FROM favoritos WHERE heroe_id = ? LIMIT 1', [heroId]);
  return rows.length > 0;
}
async function add(heroId) {
  await db.execute('INSERT INTO favoritos (heroe_id) VALUES (?)', [heroId]);
  return { heroe_id: heroId };
}
async function remove(heroId) {
  const [result] = await db.execute('DELETE FROM favoritos WHERE heroe_id = ?', [heroId]);
  return result.affectedRows > 0;
}
module.exports = { findAll, exists, add, remove };
