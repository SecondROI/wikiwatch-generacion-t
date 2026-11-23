const { positiveId, normalizeFilters } = require('../utils/validation');
const HttpError = require('../utils/HttpError');

function createHeroService(repository) {
  return {
    async list(query = {}) {
      return repository.findAll(normalizeFilters(query));
    },
    async getById(rawId) {
      const id = positiveId(rawId, 'heroe_id');
      const hero = await repository.findById(id);
      if (!hero) throw new HttpError(404, 'Héroe no encontrado');
      const [habilidades, perks] = await Promise.all([
        repository.findAbilities(id),
        repository.findPerks(id)
      ]);
      return { ...hero, habilidades, perks };
    },
  };
}
// Carga diferida: permite probar Service con un repositorio falso sin MySQL instalado.
const productionRepository = {
  findAll: (...args) => require('../repositories/heroRepository').findAll(...args),
  findById: (...args) => require('../repositories/heroRepository').findById(...args),
  findAbilities: (...args) => require('../repositories/heroRepository').findAbilities(...args),
  findPerks: (...args) => require('../repositories/heroRepository').findPerks(...args)
};
module.exports = { ...createHeroService(productionRepository), createHeroService };
