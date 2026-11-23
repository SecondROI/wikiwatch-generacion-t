# 4. Refactoring + tests unitarios

## Problema identificado

En la primera versión de WikiWatch, `showHeroes()` limpiaba el contenedor, mostraba la lista vacía, creaba HTML de tarjetas y configuraba los eventos de cada botón. La función mezclaba varias responsabilidades.

### Antes (fragmento representativo)

```js
function showHeroes(lista) {
  heroesContainer.innerHTML = '';
  lista.forEach(hero => {
    const card = document.createElement('article');
    card.classList.add('hero-card');
    card.innerHTML = `<h3>${hero.nombre}</h3>`;
    // También configuraba el botón de favoritos.
    heroesContainer.appendChild(card);
  });
}
```

### Después (código del proyecto entregado)

```js
// frontend/js/heroRendering.js
export function showHeroes(list, container, createHeroCard) {
  if (!Array.isArray(list)) throw new TypeError('La lista de héroes debe ser un array');
  container.replaceChildren();
  if (list.length === 0) {
    const p = document.createElement('p');
    p.className = 'empty-message';
    p.textContent = 'No se encontraron héroes.';
    container.appendChild(p);
    return;
  }
  const fragment = document.createDocumentFragment();
  list.forEach(hero => fragment.appendChild(createHeroCard(hero)));
  container.appendChild(fragment);
}
```

La creación de las tarjetas se hace ahora en `createHeroCard(hero)` dentro de `frontend/js/script.js`. La función que controla el listado ya no necesita saber cómo se arma cada tarjeta. El renderizado utiliza `textContent` para evitar interpretar el nombre de un héroe como HTML.

## Tests generados con ayuda de IA

Se crearon en `frontend/tests/heroRendering.test.js`, usando `node:test` y un DOM de prueba mínimo. Se mantienen los tres escenarios de la consigna y se suma uno inválido adicional:

| Test | Qué valida | Tipo |
|---|---|---|
| Dos héroes | Se crean dos tarjetas diferentes | Correcto |
| Array vacío | Aparece “No se encontraron héroes.” | Sin resultados |
| Un héroe | Se genera exactamente una tarjeta | Límite |
| Entrada `null` | Se informa un dato incorrecto mediante `TypeError` | Inválido |

También hay tests de Services y validaciones en `backend/tests/`. El resultado ejecutado de todos los tests está en `test-results.txt`.

El refactor conserva el comportamiento del listado, pero mejora organización y seguridad del renderizado. **No se modificaron los datos persistidos por ese cambio**.
