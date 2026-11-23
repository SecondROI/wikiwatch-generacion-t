const test = require('node:test');
const assert = require('node:assert/strict');
const { positiveId, normalizeFilters } = require('../utils/validation');

test('positiveId acepta un entero positivo', () => {
  assert.equal(positiveId('5'), 5);
  assert.equal(positiveId(1), 1);
});
test('positiveId rechaza entradas inválidas, parciales y el límite 0', () => {
  for (const bad of [0, '-1', 'abc', '1 OR 1=1', '2abc', '1.2', '9007199254740992']) {
    assert.throws(() => positiveId(bad), { status: 400 });
  }
});
test('normaliza rol sin distinguir mayúsculas y espacios', () => {
  assert.deepEqual(normalizeFilters({ nombre: '  gen  ', rol: 'DAÑO' }), { nombre: 'gen', rol: 'Daño' });
});
test('rol inexistente se rechaza', () => {
  assert.throws(() => normalizeFilters({ rol: 'médico' }), { status: 400 });
});
test('filtro de nombre demasiado largo se rechaza', () => {
  assert.throws(() => normalizeFilters({ nombre: 'x'.repeat(61) }), { status: 400 });
});
