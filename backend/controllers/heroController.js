const service = require('../services/heroService');
module.exports = {
  list: async (req, res) => res.json(await service.list(req.query)),
  getById: async (req, res) => res.json(await service.getById(req.params.id))
};
