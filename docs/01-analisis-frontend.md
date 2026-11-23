# 1. Análisis del frontend de WikiWatch

## Descripción

WikiWatch es una aplicación web educativa tipo wiki para jugadores de Overwatch. Busca reunir datos sobre héroes, habilidades, perks, mapas y modos de juego. Permite explorar un catálogo, buscar, filtrar y guardar favoritos.

## Funcionalidades principales

1. Visualizar héroes y su información (nombre, rol, nacionalidad, vida, dificultad, descripción e imagen).
2. Buscar héroes por nombre y filtrar por rol.
3. Consultar detalle, habilidades y perks de cada héroe.
4. Ver mapas y modos de juego.
5. Agregar y quitar héroes favoritos.
6. Mostrar mensajes de error, carga o búsquedas sin resultados.

## Entidades y datos

| Entidad | Campos esenciales | Relación |
|---|---|---|
| Héroes | `heroe_id`, `nombre`, `rol`, `nacionalidad`, `fecha_nacimiento`, `descripcion`, `imagen`, `vida`, `dificultad` | 1:N habilidades y perks |
| Habilidades | `habilidad_id`, `heroe_id`, `nombre`, `descripcion`, `tipo` | N:1 héroes |
| Perks | `perk_id`, `heroe_id`, `nombre`, `descripcion`, `nivel` | N:1 héroes |
| Mapas | `mapa_id`, `nombre`, `tipo`, `ubicacion`, `imagen`, `descripcion` | N:M modos |
| Modos de juego | `modo_id`, `nombre`, `descripcion`, `cantidad_jugadores`, `objetivo` | N:M mapas |
| Mapa_modo | `mapa_id`, `modo_id` | Tabla puente |
| Favoritos | `fav_id`, `heroe_id` | Héroe favorito registrado |

## Reglas de negocio

- El rol de un héroe debe ser Tanque, Daño o Apoyo en la búsqueda y filtrado.
- No se puede agregar dos veces el mismo héroe a favoritos.
- Solo se pueden guardar como favoritos héroes existentes.
- No se puede consultar con un ID inválido.
- Las perks pertenecen a un héroe y están agrupadas por nivel de elección.

## Persistencia: antes y después

**Antes:** `const heroes = [...]` y `let favorites = []` estaban en JavaScript. Los datos eran estáticos y los favoritos desaparecían al recargar.

**Después:** los héroes, habilidades, perks, mapas, modos y favoritos se guardan en **MySQL**. El frontend los obtiene mediante peticiones HTTP a Express (`fetch`).

## Separación frontend/backend

| Frontend | Backend |
|---|---|
| HTML, CSS, tarjetas y componentes visuales | Lectura/escritura de MySQL |
| Clicks, búsqueda, selección de filtros | Validaciones de IDs y filtros |
| Estado de carga, error, lista vacía | Reglas de negocio y duplicados |
| Mostrar respuesta HTTP al usuario | Endpoints y respuestas JSON |

El frontend no tiene que conocer las tablas SQL ni las credenciales de MySQL.
