# Instrucciones para asistentes de código en WikiWatch

- Objetivo: app wiki escolar con HTML/CSS/JS + Node/Express + MySQL.
- Conservar arquitectura Routes → Controllers → Services → Repositories.
- El frontend no realiza consultas SQL ni conoce credenciales.
- Repositories usan parámetros `?` y nunca interpolación de datos de usuarios.
- Favoritos: no duplicar héroes; validar existencia y usar índice UNIQUE.
- Mantener fechas de nacimiento del seed como estimaciones, dificultad orientativa y datos de juego potencialmente desactualizados.
- Hacer cambios mínimos y ejecutar los tests correspondientes.
- Nunca afirmar que el servidor corrió si solo se hicieron tests unitarios.
- Los ejemplos de `revisor-lab` son intencionalmente defectuosos y NO deben incorporarse a producción.
