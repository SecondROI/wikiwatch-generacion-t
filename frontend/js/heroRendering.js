/** Módulo puro de renderizado: recibe la fábrica de tarjetas por inyección. */
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
