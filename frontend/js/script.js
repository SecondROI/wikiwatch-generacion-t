import { getHeroes, getHero, getMaps, getModes, getFavorites, addFavorite, removeFavorite } from './api.js';
import { showHeroes } from './heroRendering.js';

const heroesContainer = document.getElementById('heroesContainer');
const favoritesContainer = document.getElementById('favoritesContainer');
const mapsContainer = document.getElementById('mapsContainer');
const gameModesContainer = document.getElementById('gameModesContainer');
const searchHero = document.getElementById('searchHero');
const filterRole = document.getElementById('filterRole');
const heroesStatus = document.getElementById('heroesStatus');
const dialog = document.getElementById('heroDialog');
const dialogContent = document.getElementById('heroDialogContent');

let favoriteIds = new Set();
let activeRequest = 0;
let debounceId;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = String(text); // evita inyectar HTML desde la API
  return node;
}
function displayMessage(container, message) {
  container.replaceChildren(element('p', 'empty-message', message));
}

// Refactor: showHeroes (heroRendering.js) coordina; createHeroCard crea cada tarjeta.
function createHeroCard(hero) {
  const card = element('article', 'hero-card');
  const media = element('div', 'hero-card-media');
  const initials = element('span', 'fallback-name', hero.nombre?.slice(0, 1) || '?');
  media.appendChild(initials);
  if (hero.imagen) {
    const image = document.createElement('img');
    image.src = '/' + hero.imagen.replace(/^\/+/, '');
    image.alt = `Ilustración de ${hero.nombre}`;
    image.loading = 'lazy';
    image.addEventListener('error', () => image.remove());
    media.appendChild(image);
  }
  media.appendChild(element('span', 'role-chip', hero.rol));
  const content = element('div', 'card-content');
  content.appendChild(element('h3', '', hero.nombre));
  content.appendChild(element('p', 'card-meta', `${hero.nacionalidad || 'Sin nacionalidad'} · ${hero.vida || '?'} vida`));
  const actions = element('div', 'actions');
  const details = element('button', 'btn-secondary', 'Ver información');
  details.type = 'button';
  details.addEventListener('click', () => showHeroDetails(hero.heroe_id));
  const favorite = element('button', 'btn-favorite', favoriteIds.has(hero.heroe_id) ? '★' : '☆');
  favorite.type = 'button';
  favorite.setAttribute('aria-label', `${favoriteIds.has(hero.heroe_id) ? 'Quitar' : 'Agregar'} ${hero.nombre} ${favoriteIds.has(hero.heroe_id) ? 'de' : 'a'} favoritos`);
  favorite.setAttribute('aria-pressed', String(favoriteIds.has(hero.heroe_id)));
  favorite.addEventListener('click', async () => {
    favorite.disabled = true;
    try {
      if (favoriteIds.has(hero.heroe_id)) await removeFavorite(hero.heroe_id);
      else await addFavorite(hero.heroe_id);
      await refreshFavorites();
      await loadHeroes();
    } catch (error) {
      window.alert(error.message);
      favorite.disabled = false;
    }
  });
  actions.append(details, favorite);
  content.appendChild(actions);
  card.append(media, content);
  return card;
}

async function loadHeroes() {
  const requestId = ++activeRequest;
  heroesStatus.textContent = 'Cargando héroes…';
  heroesStatus.classList.remove('error');
  try {
    const heroes = await getHeroes({ nombre: searchHero.value, rol: filterRole.value });
    if (requestId !== activeRequest) return;
    showHeroes(heroes, heroesContainer, createHeroCard);
    heroesStatus.textContent = `${heroes.length} héroe${heroes.length === 1 ? '' : 's'} encontrado${heroes.length === 1 ? '' : 's'}`;
  } catch (error) {
    if (requestId !== activeRequest) return;
    displayMessage(heroesContainer, 'No se pudo cargar el catálogo.');
    heroesStatus.textContent = error.message;
    heroesStatus.classList.add('error');
  }
}
async function refreshFavorites() {
  try {
    const favorites = await getFavorites();
    favoriteIds = new Set(favorites.map(hero => hero.heroe_id));
    showHeroes(favorites, favoritesContainer, createHeroCard);
  } catch (error) {
    displayMessage(favoritesContainer, error.message);
  }
}
function infoCard(item, subtype) {
  const card = element('article', 'info-card');
  card.append(element('span', 'card-label', subtype), element('h3', '', item.nombre),
    element('p', '', item.descripcion || 'Sin descripción'));
  card.appendChild(element('span', 'card-foot', subtype === 'Mapa'
    ? `${item.ubicacion || 'Ubicación desconocida'} · ${item.tipo || ''}`
    : `${item.cantidad_jugadores || '?'} jugadores · ${item.objetivo || ''}`));
  return card;
}
async function loadSecondaryCatalogs() {
  try {
    const [maps, modes] = await Promise.all([getMaps(), getModes()]);
    mapsContainer.replaceChildren(...maps.map(map => infoCard(map, 'Mapa')));
    gameModesContainer.replaceChildren(...modes.map(mode => infoCard(mode, 'Modo')));
    if (!maps.length) displayMessage(mapsContainer, 'No hay mapas cargados.');
    if (!modes.length) displayMessage(gameModesContainer, 'No hay modos cargados.');
  } catch (error) {
    displayMessage(mapsContainer, 'No se pudieron obtener los mapas.');
    displayMessage(gameModesContainer, 'No se pudieron obtener los modos.');
  }
}
function appendDetailsSection(title, list, note) {
  const section = element('section', 'detail-section');
  section.appendChild(element('h3', '', title));
  if (!list?.length) section.appendChild(element('p', 'card-meta', 'No hay información cargada.'));
  list?.forEach(item => {
    const line = element('div', 'detail-entry');
    const name = element('strong', '', item.nombre);
    line.appendChild(name);
    line.appendChild(element('small', '', note(item)));
    line.appendChild(element('p', '', item.descripcion || ''));
    section.appendChild(line);
  });
  dialogContent.appendChild(section);
}
async function showHeroDetails(id) {
  dialogContent.replaceChildren(element('p', 'card-meta', 'Cargando información…'));
  dialog.showModal();
  try {
    const hero = await getHero(id);
    dialogContent.replaceChildren(element('h2', 'dialog-title', hero.nombre));
    const stats = element('div', 'dialog-stats');
    [hero.rol, `${hero.vida ?? '?'} vida`, `Dificultad: ${hero.dificultad || 'Sin datos'}`, hero.nacionalidad]
      .filter(Boolean).forEach(stat => stats.appendChild(element('span', '', stat)));
    dialogContent.append(stats, element('p', 'detail-description', hero.descripcion));
    appendDetailsSection('Habilidades', hero.habilidades, h => h.tipo);
    appendDetailsSection('Perks', hero.perks, p => `Nivel ${p.nivel}`);
  } catch (error) {
    dialogContent.replaceChildren(element('p', 'error-line', error.message));
  }
}

searchHero.addEventListener('input', () => {
  clearTimeout(debounceId);
  debounceId = setTimeout(loadHeroes, 250);
});
filterRole.addEventListener('change', loadHeroes);
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

Promise.allSettled([refreshFavorites(), loadSecondaryCatalogs()]).then(loadHeroes);
export { createHeroCard }; // función extraída y reutilizada
