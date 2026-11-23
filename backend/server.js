require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const app = require('./app');
const db = require('./config/database');

async function start() {
  await db.query('SELECT 1');
  const port = Number(process.env.PORT || 3000);
  const server = app.listen(port, () => {
    console.log(`WikiWatch funcionando en http://localhost:${port}`);
  });
  function shutdown() {
    server.close(() => db.end().then(() => process.exit(0)));
  }
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
start().catch(error => {
  console.error('No se pudo conectar a MySQL. Verificá XAMPP y backend/.env.');
  console.error(error.message);
  process.exitCode = 1;
});
