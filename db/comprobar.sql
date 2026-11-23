USE wikiwatch;
SELECT COUNT(*) AS heroes FROM heroes;
SELECT COUNT(*) AS habilidades FROM habilidades;
SELECT COUNT(*) AS perks FROM perks;
SELECT COUNT(*) AS mapas FROM mapas;
SELECT COUNT(*) AS modos FROM modos_juego;
SELECT h.nombre, COUNT(DISTINCT a.habilidad_id) AS habilidades, COUNT(DISTINCT p.perk_id) AS perks
FROM heroes h LEFT JOIN habilidades a ON a.heroe_id = h.heroe_id
LEFT JOIN perks p ON p.heroe_id = h.heroe_id
GROUP BY h.heroe_id, h.nombre;
