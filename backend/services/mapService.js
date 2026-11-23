const repository = require('../repositories/mapRepository');
const { positiveId } = require('../utils/validation');
const HttpError = require('../utils/HttpError');

async function getMaps() { return repository.findAll(); }
async function getMapById(rawId) {
  const id = positiveId(rawId, 'mapa_id');
  const mapa = await repository.findById(id);
  if (!mapa) throw new HttpError(404, 'Mapa no encontrado');
  return { ...mapa, modos: await repository.findModesForMap(id) };
}
async function getModes() { return repository.findAllModes(); }
async function getModeById(rawId) {
  const id = positiveId(rawId, 'modo_id');
  const modo = await repository.findModeById(id);
  if (!modo) throw new HttpError(404, 'Modo de juego no encontrado');
  return { ...modo, mapas: await repository.findMapsForMode(id) };
}
module.exports = { getMaps, getMapById, getModes, getModeById };
