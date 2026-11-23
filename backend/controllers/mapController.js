const service = require('../services/mapService');
module.exports = {
  listMaps: async (req, res) => res.json(await service.getMaps()),
  getMapById: async (req, res) => res.json(await service.getMapById(req.params.id)),
  listModes: async (req, res) => res.json(await service.getModes()),
  getModeById: async (req, res) => res.json(await service.getModeById(req.params.id))
};
