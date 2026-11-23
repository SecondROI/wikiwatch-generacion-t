-- WikiWatch | Estructura MySQL / MariaDB (probada conceptualmente con InnoDB)
-- Ejecutar PRIMERO. No elimina tablas existentes.
CREATE DATABASE IF NOT EXISTS wikiwatch CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wikiwatch;

CREATE TABLE IF NOT EXISTS heroes (
  heroe_id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(30) NOT NULL UNIQUE,
  rol VARCHAR(7) NOT NULL,
  nacionalidad VARCHAR(30),
  fecha_nacimiento DATE,
  descripcion VARCHAR(255),
  imagen VARCHAR(255),
  vida INT,
  dificultad VARCHAR(15)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS habilidades (
  habilidad_id INT PRIMARY KEY AUTO_INCREMENT,
  heroe_id INT NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255),
  tipo VARCHAR(30),
  CONSTRAINT fk_habilidades_heroes FOREIGN KEY (heroe_id) REFERENCES heroes(heroe_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS perks (
  perk_id INT PRIMARY KEY AUTO_INCREMENT,
  heroe_id INT NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255),
  nivel INT NOT NULL,
  CONSTRAINT fk_perks_heroes FOREIGN KEY (heroe_id) REFERENCES heroes(heroe_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS mapas (
  mapa_id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  tipo VARCHAR(30),
  ubicacion VARCHAR(50),
  imagen VARCHAR(255),
  descripcion VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS modos_juego (
  modo_id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  cantidad_jugadores INT,
  objetivo VARCHAR(30)
) ENGINE=InnoDB;

-- Relación N:M correcta: las FK solo viven en la tabla intermedia.
CREATE TABLE IF NOT EXISTS mapa_modo (
  mapa_id INT NOT NULL,
  modo_id INT NOT NULL,
  PRIMARY KEY (mapa_id, modo_id),
  CONSTRAINT fk_mapa_modo_mapas FOREIGN KEY (mapa_id) REFERENCES mapas(mapa_id) ON DELETE CASCADE,
  CONSTRAINT fk_mapa_modo_modos FOREIGN KEY (modo_id) REFERENCES modos_juego(modo_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Por ahora los favoritos son compartidos: el proyecto no tiene cuentas.
CREATE TABLE IF NOT EXISTS favoritos (
  fav_id INT PRIMARY KEY AUTO_INCREMENT,
  heroe_id INT NOT NULL UNIQUE,
  CONSTRAINT fk_favoritos_heroes FOREIGN KEY (heroe_id) REFERENCES heroes(heroe_id) ON DELETE CASCADE
) ENGINE=InnoDB;
