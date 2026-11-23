const { positiveId } = require('../utils/validation');
const HttpError = require('../utils/HttpError');

function createFavoriteService(favorites, heroes) {
  return {
    async list() { return favorites.findAll(); },
    async add(rawId) {
      const id = positiveId(rawId, 'heroe_id');
      if (!(await heroes.findById(id))) throw new HttpError(404, 'Héroe no encontrado');
      if (await favorites.exists(id)) throw new HttpError(409, 'El héroe ya está en favoritos');
      try {
        return await favorites.add(id);
      } catch (error) {
        // UNIQUE(heroe_id) también impide duplicados ante peticiones simultáneas.
        if (error.code === 'ER_DUP_ENTRY') throw new HttpError(409, 'El héroe ya está en favoritos');
        throw error;
      }
    },
    async remove(rawId) {
      const id = positiveId(rawId, 'heroe_id');
      if (!(await favorites.remove(id))) throw new HttpError(404, 'El héroe no estaba en favoritos');
    },
  };
}
const productionFavorites = {
  findAll: (...args) => require('../repositories/favoriteRepository').findAll(...args),
  exists: (...args) => require('../repositories/favoriteRepository').exists(...args),
  add: (...args) => require('../repositories/favoriteRepository').add(...args),
  remove: (...args) => require('../repositories/favoriteRepository').remove(...args)
};
const productionHeroes = {
  findById: (...args) => require('../repositories/heroRepository').findById(...args)
};
module.exports = { ...createFavoriteService(productionFavorites, productionHeroes), createFavoriteService };
