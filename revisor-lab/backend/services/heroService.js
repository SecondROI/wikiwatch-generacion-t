const heroRepository = require("../repositories/heroRepository");

async function getHeroes() {
    return heroRepository.getAllHeroes();
}

module.exports = { getHeroes };
