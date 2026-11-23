const heroService = require("../services/heroService");

async function getHeroes(req, res) {
    try {
        const heroes = await heroService.getHeroes();
        return res.status(200).json(heroes);
    } catch (error) {
        console.error("Error consultando héroes:", error);
        return res.status(500).json({ error: "Error al obtener los héroes" });
    }
}

module.exports = { getHeroes };
