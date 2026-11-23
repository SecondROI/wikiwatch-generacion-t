# WikiWatch — Trabajo Práctico Final de Generación T

**WikiWatch** es una wiki educativa sobre Overwatch. Permite consultar héroes, sus habilidades y *perks*, conocer mapas y modos de juego, buscar/filtrar personajes y guardar favoritos en una base de datos MySQL.

> Proyecto educativo no oficial. Overwatch y los nombres de sus personajes pertenecen a Blizzard Entertainment. Las gráficas SVG incluidas son **marcadores decorativos propios**, no ilustraciones oficiales. Los datos de ejemplo están preparados para practicar el desarrollo y pueden quedar desactualizados respecto del videojuego.

## Funcionalidades

- Catálogo de héroes con búsqueda por nombre y filtro por rol (Tanque, Daño, Apoyo).
- Detalle de cada héroe con habilidades y perks organizadas por nivel.
- Listado de mapas y modos de juego.
- Favoritos que se guardan en MySQL; no se pierden al recargar la página.
- Mensajes de carga, de lista vacía y de error.
- Diseño adaptable a pantallas de celular y escritorio.
- API REST con validación de entradas y control de errores.
- 19 pruebas automatizadas de lógica y renderizado, más laboratorio separado del agente revisor.

## Tecnologías

**Frontend:** HTML5, CSS3, JavaScript ES Modules y Fetch API. **Backend:** Node.js, Express, arquitectura Controller → Service → Repository. **Persistencia:** MySQL/MariaDB y `mysql2`. **Calidad:** tests con `node:test`, GitHub Actions y subagente `.claude/agents/revisor.md`.

## Estructura

```text
WikiWatch_TP_Final/
├── frontend/               # Interfaz, estilos, módulos JS e imágenes SVG
│   ├── index.html
│   ├── css/style.css
│   ├── js/{api,script,heroRendering}.js
│   ├── img/heroes/
│   └── tests/
├── backend/
│   ├── config/             # Pool de conexiones MySQL
│   ├── routes/             # Endpoints Express
│   ├── controllers/        # HTTP: entradas y respuestas
│   ├── services/           # Reglas de negocio
│   ├── repositories/       # Consultas SQL parametrizadas
│   ├── middlewares/        # Manejo de errores
│   ├── tests/              # Pruebas unitarias con repositorios simulados
│   ├── app.js
│   └── server.js
├── db/                     # Schema, DML y comprobaciones SQL
├── docs/                   # Consignas, decisiones y resultados
├── revisor-lab/            # Experimento de medición aislado
├── .claude/agents/revisor.md
├── .github/workflows/backend-tests.yml
└── PUBLICAR_EN_GITHUB.md
```

## Cómo ejecutar la aplicación (Windows + XAMPP)

**Requisitos:** Node.js 20 o superior, MySQL/MariaDB (por ejemplo, en XAMPP), npm.

1. Iniciá **MySQL** desde XAMPP.
2. Abrí `http://localhost/phpmyadmin`. Desde **Importar**, ejecutá `db/schema.sql` y después `db/seed.sql` (en ese orden). Ambos scripts pueden ejecutarse desde la pestaña SQL. `db/seed.sql` agrega tres héroes de roles distintos, habilidades, perks, mapas y modos.
3. Copiá `backend/.env.example` como **`backend/.env`**. Ajustá el puerto de MySQL, usuario y contraseña si los configuraste. Nunca publiques `.env`.
4. Abrí una terminal en `backend` y ejecutá:

```bash
npm install
npm start
```

5. Abrí **http://localhost:3000** en el navegador. La API se sirve en la misma dirección para evitar problemas de CORS.

Para desarrollo, desde `backend`: `npm run dev`. Si falla la conexión, comprobá la configuración y que la base `wikiwatch` existe. No abras `frontend/index.html` mediante `file://` porque las rutas `/api` necesitan el servidor.

### Verificaciones rápidas

- `http://localhost:3000/api/salud` debe devolver `{"ok":true,"app":"WikiWatch"}`.
- `http://localhost:3000/api/heroes` debe devolver los héroes de MySQL.
- `http://localhost:3000/api/heroes/1` debe incluir `habilidades` y `perks`.
- En la web, agregá Genji a favoritos y recargá: debe permanecer (porque está en MySQL).

**Nota:** la comprobación del servidor conectado a MySQL corresponde al equipo/alumno. El entorno donde se construyó este paquete no tenía MySQL ejecutándose ni pudo instalar los paquetes npm por restricción de red; **no afirmamos haber verificado esos endpoints en vivo**.

## Cómo ejecutar los tests

Desde la raíz del proyecto:

```bash
npm test
```

O independientemente, sin instalación de dependencias externas:

```bash
node --test frontend/tests/*.test.js backend/tests/*.test.js
```

Las 19 pruebas del proyecto se ejecutaron satisfactoriamente en el entorno de generación. Su salida se conserva en `docs/test-results.txt`. Se verifican casos válidos, inválidos, límites y reglas de favoritos; las pruebas de Service inyectan repositorios de prueba, por lo que no requieren MySQL. **No reemplazan un test de integración contra una instancia real**.

## Endpoints diseñados

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/salud` | Estado del servidor HTTP (no verifica MySQL) |
| `GET` | `/api/heroes` | Obtener héroes; filtros `?nombre=...&rol=...` |
| `GET` | `/api/heroes/:id` | Obtener héroe, habilidades y perks |
| `GET` | `/api/mapas` | Listar mapas |
| `GET` | `/api/mapas/:id` | Mapa con sus modos |
| `GET` | `/api/modos` | Listar modos de juego |
| `GET` | `/api/modos/:id` | Modo con sus mapas |
| `GET` | `/api/favoritos` | Listar favoritos |
| `POST` | `/api/favoritos` | Agregar `{ "heroe_id": 1 }` |
| `DELETE` | `/api/favoritos/:heroeId` | Quitar favorito |

Ejemplo de respuesta `GET /api/heroes/:id`:

```json
{
  "heroe_id": 1,
  "nombre": "Genji",
  "rol": "Daño",
  "habilidades": [{ "habilidad_id": 1, "nombre": "Shuriken", "tipo": "Arma" }],
  "perks": [{ "perk_id": 1, "nombre": "Cortes fugaces", "nivel": 2 }]
}
```

*La respuesta anterior es ilustrativa y omite campos; no es evidencia de una petición ejecutada.*

## Documentación para la entrega

- [`docs/01-analisis-frontend.md`](docs/01-analisis-frontend.md): funcionalidades, entidades, persistencia y responsabilidades.
- [`docs/02-diseno-backend.md`](docs/02-diseno-backend.md): endpoints y arquitectura.
- [`docs/03-ia-cuestionada.md`](docs/03-ia-cuestionada.md): decisiones de la IA que se cuestionaron.
- [`docs/04-refactor-tests.md`](docs/04-refactor-tests.md): antes/después del refactor y pruebas.
- [`docs/05-agente-revisor.md`](docs/05-agente-revisor.md): agente, medición y limitaciones de la prueba.
- [`docs/06-evidencias-y-pendientes.md`](docs/06-evidencias-y-pendientes.md): evidencia verificable y pendientes locales.
- [`docs/07-resumen-entrega.md`](docs/07-resumen-entrega.md): resumen para el Campus GT.
- [`PUBLICAR_EN_GITHUB.md`](PUBLICAR_EN_GITHUB.md): publicación y obtención del link real al repo.

## Decisiones y limitaciones

- Habilidades y perks son entidades independientes, relacionadas 1:N con `heroes`.
- `mapa_modo` resuelve una relación N:M y evita duplicados por su PK compuesta.
- No hay cuentas de usuario: los favoritos son **compartidos** por todos los visitantes de la instancia. No publicar la app como un servicio multiusuario sin agregar autenticación/identidad.
- `fecha_nacimiento` guarda fechas estimadas derivadas de edades del lore; no deben considerarse fechas oficiales exactas.
- La dificultad es valoración orientativa de WikiWatch, no una clasificación oficial de Blizzard.
- Las referencias a datos del videojuego pueden requerir actualización.
- El frontend y la estructura de esta entrega fueron **reconstruidos a partir del trabajo explicado en conversación**, no copiados de la carpeta local original del alumno. Antes de entregar, comparar con los propios archivos si hay cambios adicionales.

## Licencia y uso

Trabajo académico de demostración. El código creado para el TP puede utilizarse y modificarse con fines educativos; no incluye material gráfico oficial del juego.
