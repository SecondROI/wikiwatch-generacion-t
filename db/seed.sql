-- WikiWatch | Datos educativos ilustrativos para 3 roles
-- Ejecutar DESPUÉS de schema.sql. Diseñado para BD nueva; INSERT IGNORE evita duplicación.
-- Dificultad = valoración propia; fechas de nacimiento = cálculo aproximado desde edades del lore;
-- vida / habilidades / perks pueden cambiar con actualizaciones de Overwatch.
USE wikiwatch;

INSERT IGNORE INTO heroes
(heroe_id, nombre, rol, nacionalidad, fecha_nacimiento, descripcion, imagen, vida, dificultad)
VALUES
(1,'Genji','Daño','Japón','1988-10-28','Ninja cíborg que combina movilidad, precisión y ataques rápidos.','img/heroes/genji.svg',250,'Difícil'),
(2,'Reinhardt','Tanque','Alemania','1963-06-26','Veterano defensor de la justicia, con martillo y barrera protectora.','img/heroes/reinhardt.svg',700,'Media'),
(3,'Mercy','Apoyo','Suiza','1987-05-13','Médica e investigadora que cura, potencia y puede resucitar aliados.','img/heroes/mercy.svg',225,'Media');

INSERT IGNORE INTO habilidades (habilidad_id,heroe_id,nombre,descripcion,tipo) VALUES
(1,1,'Shuriken','Lanza proyectiles a distancia con dos patrones de disparo.','Arma'),
(2,1,'Desvío','Desvía disparos y bloquea determinados ataques cuerpo a cuerpo.','Habilidad'),
(3,1,'Corte veloz','Se desplaza hacia delante y daña a los enemigos en su camino.','Habilidad'),
(4,1,'Hoja del dragón','Desenfunda su espada durante un tiempo limitado.','Definitiva'),
(5,1,'Ciberagilidad','Permite doble salto y escalar paredes.','Pasiva'),
(6,2,'Martillo a reacción','Arma de gran alcance en combate cuerpo a cuerpo.','Arma'),
(7,2,'Campo protector','Proyecta una barrera para absorber ataques enemigos.','Habilidad'),
(8,2,'Embestida','Carga hacia delante y puede atrapar enemigos contra una pared.','Habilidad'),
(9,2,'Onda de fuego','Lanza un proyectil que atraviesa enemigos.','Habilidad'),
(10,2,'Seísmo','Derriba a enemigos frente a Reinhardt.','Definitiva'),
(11,3,'Bastón caduceo','Cura a aliados o potencia el daño que provocan.','Arma'),
(12,3,'Pistola caducea','Arma de defensa personal a distancia.','Arma'),
(13,3,'Ángel de la guarda','Permite desplazarse rápidamente hacia un compañero.','Habilidad'),
(14,3,'Resurrección','Devuelve a un compañero eliminado a la partida.','Habilidad'),
(15,3,'Descenso angélico','Reduce la velocidad de caída.','Pasiva'),
(16,3,'Valkiria','Potencia la movilidad y las habilidades durante su definitiva.','Definitiva');

INSERT IGNORE INTO perks (perk_id,heroe_id,nombre,descripcion,nivel) VALUES
(1,1,'Cortes fugaces','Mejora la disponibilidad de Corte veloz.','2'),
(2,1,'Sed de dragón','Agrega recuperación de salud durante Hoja del dragón.','2'),
(3,1,'Giro de hoja','Mejora la efectividad de Corte veloz.','3'),
(4,1,'Meditación','Permite recuperar salud al usar Desvío.','3'),
(5,2,'Fuego del cruzado','Beneficio asociado al uso de Onda de fuego.','2'),
(6,2,'Determinación cruzada','Mejora la resistencia al usar el escudo.','2'),
(7,2,'Embate con escudo','Agrega una opción de ataque mientras utiliza su barrera.','3'),
(8,2,'Furia ardiente','Ofrece mejoras ofensivas al conectar ataques.','3'),
(9,3,'Resurrección angelical','Mejora la supervivencia después de Resurrección.','2'),
(10,3,'Alcance alado','Mejora la movilidad de Ángel de la guarda.','2'),
(11,3,'Potenciación en cadena','Amplía opciones de potenciación del Bastón.','3'),
(12,3,'Doble dosis','Permite acceder a un beneficio alternativo de curación.','3');

INSERT IGNORE INTO modos_juego(modo_id,nombre,descripcion,cantidad_jugadores,objetivo) VALUES
(1,'Híbrido','Primero se conquista un punto y después se escolta una carga.',10,'Capturar y escoltar'),
(2,'Control','Dos equipos luchan por dominar un objetivo.',10,'Controlar el punto'),
(3,'Escolta','Un equipo transporta una carga mientras el otro la detiene.',10,'Escoltar carga'),
(4,'Empuje','Dos equipos intentan llevar un robot hasta la meta rival.',10,'Empujar robot');
INSERT IGNORE INTO mapas(mapa_id,nombre,tipo,ubicacion,imagen,descripcion) VALUES
(1,"King's Row",'Híbrido','Londres, Reino Unido',NULL,'Calles y edificios urbanos con un punto de captura y recorrido de carga.'),
(2,'Ilios','Control','Grecia',NULL,'Escenario costero con varios puntos de control.'),
(3,'Circuit Royal','Escolta','Mónaco',NULL,'Circuito urbano elevado donde se escolta una carga.'),
(4,'Esperança','Empuje','Portugal',NULL,'Ciudad donde ambos equipos compiten por avanzar con el robot.');
INSERT IGNORE INTO mapa_modo(mapa_id,modo_id) VALUES
(1,1),(2,2),(3,3),(4,4);
