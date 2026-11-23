// Acceso a la API en un solo lugar: el frontend no conoce MySQL ni usa SQL.
async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      headers: { 'Content-Type': 'application/json' }, ...options
    });
  } catch {
    throw new Error('No se pudo contactar al backend. ¿Está iniciado el servidor?');
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Error HTTP ${response.status}`);
  }
  return response.status === 204 ? null : response.json();
}

export function getHeroes(filters = {}) {
  const params = new URLSearchParams();
  if (filters.nombre) params.set('nombre', filters.nombre);
  if (filters.rol) params.set('rol', filters.rol);
  const query = params.toString();
  return request(`/api/heroes${query ? '?' + query : ''}`);
}
export const getHero = id => request(`/api/heroes/${encodeURIComponent(id)}`);
export const getMaps = () => request('/api/mapas');
export const getModes = () => request('/api/modos');
export const getFavorites = () => request('/api/favoritos');
export const addFavorite = id => request('/api/favoritos', { method: 'POST', body: JSON.stringify({ heroe_id: id }) });
export const removeFavorite = id => request(`/api/favoritos/${encodeURIComponent(id)}`, { method: 'DELETE' });
