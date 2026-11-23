const HttpError = require('./HttpError');
const ROLES = ['Tanque', 'Daño', 'Apoyo'];

function positiveId(value, field = 'id') {
  // Evita que parseInt("3abc") se interprete como 3.
  if (!/^[1-9]\d*$/.test(String(value))) {
    throw new HttpError(400, `${field} debe ser un entero positivo`);
  }
  const number = Number(value);
  if (!Number.isSafeInteger(number)) {
    throw new HttpError(400, `${field} supera el límite permitido`);
  }
  return number;
}

function normalizeFilters(query = {}) {
  const { nombre = '', rol = '' } = query;
  if (typeof nombre !== 'string' || nombre.length > 60 || typeof rol !== 'string') {
    throw new HttpError(400, 'Filtros inválidos');
  }
  const nameClean = nombre.trim();
  const roleClean = rol.trim();
  if (roleClean && !ROLES.some(r => r.toLowerCase() === roleClean.toLowerCase())) {
    throw new HttpError(400, 'Rol inválido. Opciones: Tanque, Daño, Apoyo');
  }
  const normalizedRole = ROLES.find(r => r.toLowerCase() === roleClean.toLowerCase()) || '';
  return { nombre: nameClean, rol: normalizedRole };
}
module.exports = { positiveId, normalizeFilters, ROLES };
