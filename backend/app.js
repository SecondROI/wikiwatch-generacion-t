const express = require('express');
const path = require('path');
const heroRoutes = require('./routes/heroRoutes');
const mapRoutes = require('./routes/mapRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use('/api/heroes', heroRoutes);
app.use('/api/favoritos', favoriteRoutes);
app.use('/api', mapRoutes);
app.get('/api/salud', (req, res) => res.json({ ok: true, app: 'WikiWatch' }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use('/api', notFound);
app.use(errorHandler);
module.exports = app;
