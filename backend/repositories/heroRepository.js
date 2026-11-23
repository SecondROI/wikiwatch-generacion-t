const db = require('../config/database');

async function findAll({ nombre = '', rol = '' } = {}) {
  const sql = `
    SELECT heroe_id, nombre, rol, nacionalidad, fecha_nacimiento,
           descripcion, imagen, vida, dificultad
    FROM heroes
    WHERE (? = '' OR nombre LIKE CONCAT('%', ?, '%'))
      AND (? = '' OR rol = ?)
    ORDER BY nombre ASC
    LIMIT 100
  `;
  const [rows] = await db.execute(sql, [nombre, nombre, rol, rol]);
  return rows;
}

async function findById(id) {
  const [rows] = await db.execute('SELECT * FROM heroes WHERE heroe_id = ?', [id]);
  return rows[0] || null;
}

async function findAbilities(id) {
  const [rows] = await db.execute(
    'SELECT habilidad_id, nombre, descripcion, tipo FROM habilidades WHERE heroe_id = ? ORDER BY habilidad_id', [id]
  );
  return rows;
}

async function findPerks(id) {
  const [rows] = await db.execute(
    'SELECT perk_id, nombre, descripcion, nivel FROM perks WHERE heroe_id = ? ORDER BY nivel, perk_id', [id]
  );
  return rows;
}

module.exports = { findAll, findById, findAbilities, findPerks };
