const service = require('../services/favoriteService');
module.exports = {
  list: async (req, res) => res.json(await service.list()),
  add: async (req, res) => res.status(201).json(await service.add(req.body?.heroe_id)),
  remove: async (req, res) => {
    await service.remove(req.params.heroeId);
    return res.status(204).end();
  }
};
