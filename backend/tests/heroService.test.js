const test = require('node:test');
const assert = require('node:assert/strict');
const { createHeroService } = require('../services/heroService');

const hero = { heroe_id: 1, nombre: 'Genji', rol: 'Daño' };
function repository() {
  return {
    findAll: async filters => ({ filters, data: [hero] }),
    findById: async id => id === 1 ? hero : null,
    findAbilities: async () => [{ nombre: 'Shuriken' }],
    findPerks: async () => [{ nombre: 'Meditación', nivel: 3 }]
  };
}
test('lista los héroes aplicando filtros validados', async () => {
  const service = createHeroService(repository());
  const result = await service.list({ nombre: '  ge ', rol: 'daño' });
  assert.deepEqual(result.filters, { nombre: 'ge', rol: 'Daño' });
});
test('obtiene detalle con habilidades y perks (caso correcto)', async () => {
  const service = createHeroService(repository());
  const result = await service.getById('1');
  assert.equal(result.nombre, 'Genji');
  assert.equal(result.habilidades.length, 1);
  assert.equal(result.perks.length, 1);
});
test('rechaza la búsqueda de un héroe inexistente (caso límite)', async () => {
  const service = createHeroService(repository());
  await assert.rejects(service.getById('999'), { status: 404 });
});
test('rechaza ID malformado (caso inválido)', async () => {
  const service = createHeroService(repository());
  await assert.rejects(service.getById('1;DROP TABLE heroes'), { status: 400 });
});
