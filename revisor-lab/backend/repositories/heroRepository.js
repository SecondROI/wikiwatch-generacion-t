const db = require("../config/database");

async function getAllHeroes() {
    const [rows] = await db.query("SELECT * FROM heroes");
    return rows;
}

async function getByName(nombre) {
    const [rows] = await db.query(`SELECT * FROM heroes WHERE nombre = '${nombre}'`);
    return rows;
}

module.exports = { getAllHeroes, getByName };
