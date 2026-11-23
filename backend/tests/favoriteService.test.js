const test = require('node:test');
const assert = require('node:assert/strict');
const { createFavoriteService } = require('../services/favoriteService');

function setup() {
  const data = new Set();
  const fav = {
    findAll: async () => [...data].map(heroe_id => ({ heroe_id })),
    exists: async id => data.has(id),
    add: async id => { data.add(id); return { heroe_id: id }; },
    remove: async id => data.delete(id)
  };
  const heroes = { findById: async id => id === 1 ? { heroe_id: 1 } : null };
  return createFavoriteService(fav, heroes);
}
test('agrega y lista un favorito válido', async () => {
  const service = setup();
  assert.deepEqual(await service.add(1), { heroe_id: 1 });
  assert.deepEqual(await service.list(), [{ heroe_id: 1 }]);
});
test('impide agregar el mismo héroe dos veces', async () => {
  const service = setup();
  await service.add(1);
  await assert.rejects(service.add(1), { status: 409 });
});
test('impide agregar un héroe inexistente', async () => {
  await assert.rejects(setup().add(2), { status: 404 });
});
test('rechaza un identificador inválido', async () => {
  await assert.rejects(setup().add('0 OR 1=1'), { status: 400 });
});
test('elimina favorito y devuelve 404 al intentar eliminarlo de nuevo', async () => {
  const service = setup();
  await service.add(1);
  await service.remove('1');
  await assert.rejects(service.remove('1'), { status: 404 });
});
test('reconvierte un error de índice UNIQUE por carrera a 409', async () => {
  const fav = { exists: async () => false, add: async () => { const err = Error(); err.code = 'ER_DUP_ENTRY'; throw err; } };
  const heroes = { findById: async () => ({ heroe_id: 1 }) };
  await assert.rejects(createFavoriteService(fav, heroes).add(1), { status: 409 });
});
