import test from 'node:test';
import assert from 'node:assert/strict';
import { showHeroes } from '../js/heroRendering.js';

// DOM mínimo de prueba, suficiente para comprobar el render sin librerías externas.
class FakeNode {
  constructor(tag) { this.tag = tag; this.children = []; this.className = ''; this.textContent = ''; }
  replaceChildren(...children) { this.children = [...children]; }
  appendChild(child) {
    if (child.tag === 'fragment') this.children.push(...child.children);
    else this.children.push(child);
    return child;
  }
}
globalThis.document = {
  createElement: tag => new FakeNode(tag),
  createDocumentFragment: () => new FakeNode('fragment')
};
const makeCard = hero => {
  const card = new FakeNode('article');
  card.className = 'hero-card';
  card.textContent = hero.nombre;
  return card;
};

test('caso correcto: dos héroes producen dos tarjetas', () => {
  const container = new FakeNode('div');
  showHeroes([{ nombre: 'Genji' }, { nombre: 'Mercy' }], container, makeCard);
  assert.equal(container.children.length, 2);
  assert.equal(container.children[0].textContent, 'Genji');
});

test('caso sin resultados: lista vacía muestra el mensaje correcto', () => {
  const container = new FakeNode('div');
  showHeroes([], container, makeCard);
  assert.equal(container.children.length, 1);
  assert.equal(container.children[0].textContent, 'No se encontraron héroes.');
  assert.equal(container.children[0].className, 'empty-message');
});

test('caso límite: un solo héroe produce una sola tarjeta', () => {
  const container = new FakeNode('div');
  showHeroes([{ nombre: 'Reinhardt' }], container, makeCard);
  assert.equal(container.children.length, 1);
  assert.equal(container.children[0].textContent, 'Reinhardt');
});

test('dato inválido: una entrada que no sea array se rechaza', () => {
  const container = new FakeNode('div');
  assert.throws(() => showHeroes(null, container, makeCard), TypeError);
});
