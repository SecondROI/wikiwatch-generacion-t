# 6. Evidencias y verificaciones pendientes

## Verificado en el entorno de construcción

- `node --check` confirmó la sintaxis de los archivos JS consultados.
- `node --test frontend/tests/*.test.js backend/tests/*.test.js` pasó **19 pruebas de 19**: 0 fallos. La salida completa está en `docs/test-results.txt`.
- El laboratorio del revisor está separado de la aplicación funcional.
- Los scripts de MySQL se encuentran en `db/schema.sql`, `db/seed.sql` y `db/comprobar.sql`.

## No verificado en este entorno

- Conexión en vivo a un MySQL/XAMPP local.
- Ejecución HTTP completa de Express: no se pudo descargar `express`, `mysql2` y `dotenv` por restricciones de red del entorno de construcción.
- Capturas reales de `/api/heroes` y de la web cargando la BD.
- Ejecución en dos chats nuevos de un subagente de IA real para la medición del revisor.
- Publicación en GitHub y URL final de un repositorio.

## Cómo tomar las capturas para el Campus

1. Ejecutar el servidor con MySQL instalado e importar los scripts SQL.
2. Abrir `http://localhost:3000` y tomar una captura del catálogo con los tres héroes.
3. Abrir `http://localhost:3000/api/heroes` y tomar una captura mostrando el JSON devuelto por el backend.
4. Abrir `http://localhost:3000/api/heroes/1`, verificar que muestre `habilidades` y `perks`.
5. Agregar un favorito, recargar y comprobar que permanezca; opcionalmente mostrar la tabla `favoritos` en phpMyAdmin.
6. Ejecutar `npm test` y capturar el resultado con tests en verde.
7. Ejecutar el agente real con los cinco archivos del laboratorio en dos chats nuevos y guardar sus salidas si se exige esa evidencia.

**No adjuntamos capturas falsas de una ejecución que no ocurrió.**
