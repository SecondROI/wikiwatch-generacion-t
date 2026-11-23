const HttpError = require('../utils/HttpError');

function notFound(req, res, next) {
  next(new HttpError(404, 'Ruta no encontrada'));
}
function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
    ? error.status : 500;
  if (status === 500) console.error(error);
  res.status(status).json({ error: status === 500 ? 'Error interno del servidor' : error.message });
}
module.exports = { notFound, errorHandler };
