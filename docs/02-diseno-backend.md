# 2. Arquitectura del backend y endpoints

## Arquitectura elegida

Se eligió una **arquitectura por capas: Routes → Controllers → Services → Repositories → MySQL**.

```text
Navegador (fetch)
    │
    ▼
Routes (seleccionan método y URL)
    │
    ▼
Controllers (manejan req/res HTTP)
    │
    ▼
Services (validaciones y reglas de negocio)
    │
    ▼
Repositories (consultas SQL parametrizadas)
    │
    ▼
MySQL (persistencia)
```

La elegí porque cada parte cumple una función distinta. Si en el futuro cambiamos MySQL, no necesitamos reescribir los componentes visuales; y si cambia una regla (como impedir un favorito duplicado), se modifica en Service sin mezclarla con las rutas ni el HTML.

## Endpoints

| Método | Ruta | Datos que entran | Respuesta esperada |
|---|---|---|---|
| `GET` | `/api/heroes` | `nombre`, `rol` opcionales | Lista JSON |
| `GET` | `/api/heroes/:id` | ID positivo | Objeto con habilidades y perks, o 404 |
| `GET` | `/api/mapas` | Ninguno | Lista JSON |
| `GET` | `/api/mapas/:id` | ID positivo | Mapa con modos |
| `GET` | `/api/modos` | Ninguno | Lista JSON |
| `GET` | `/api/modos/:id` | ID positivo | Modo con mapas |
| `GET` | `/api/favoritos` | Ninguno | Héroes favoritos |
| `POST` | `/api/favoritos` | JSON: `{"heroe_id":1}` | 201, 400, 404 o 409 |
| `DELETE` | `/api/favoritos/:heroeId` | ID positivo | 204 o 404 |

No se agregaron endpoints de edición de héroes porque el frontend es una wiki de consulta, no un panel de administración.

## Funcionalidad backend implementada

**Obtener héroes desde MySQL:**

- `GET /api/heroes`
- `heroRoutes.js` deriva a `heroController.list`.
- `heroController.js` llama `heroService.list(req.query)`.
- `heroService.js` valida y normaliza filtros de rol/nombre.
- `heroRepository.js` ejecuta un `SELECT` parametrizado sobre `heroes` con máximo 100 resultados.
- Express responde con JSON que el navegador renderiza mediante `showHeroes`.

Adicionalmente se implementaron consultas de detalle, mapas, modos y favoritos (con verificación de duplicados y existencia).

## Errores y robustez

- 400 para IDs o filtros inválidos.
- 404 para héroes, mapas, modos o favoritos que no existen.
- 409 para un favorito duplicado.
- 500 para errores inesperados sin exponer detalles internos al navegador.
- Las consultas usan parámetros `?`, sin concatenar datos del usuario en SQL.
- El archivo `.env` queda fuera de Git.

## Evidencia

La lógica de servicios y validación pasó las pruebas automatizadas; el archivo de salida está en `test-results.txt`. La prueba de integración con MySQL y la respuesta HTTP en vivo deben realizarse en una computadora con MySQL y dependencias de Node instaladas.
