# Cómo publicar WikiWatch en GitHub y entregar el enlace

**El ZIP es un proyecto listo para versionar, pero todavía no es un repositorio remoto.** El enlace que solicita Campus GT debe ser la URL real de un repositorio en GitHub, no un archivo ZIP local.

## Opción recomendada: GitHub web + Git (Windows)

1. Iniciá sesión en GitHub y abrí **https://github.com/new**.
2. Escribí como nombre: `wikiwatch-generacion-t`. Elegí **Public** si el docente debe abrir el repositorio sin iniciar sesión.
3. Creá el repositorio **sin agregar** README, licencia ni `.gitignore` desde GitHub (estos archivos ya están en el proyecto).
4. Descomprimí el ZIP en tu computadora. Abrí CMD o PowerShell **dentro de la carpeta `WikiWatch_TP_Final`** (la que contiene el README principal).
5. Ejecutá:

```bash
git init
git add .
git commit -m "Entrega final WikiWatch - Generación T"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/wikiwatch-generacion-t.git
git push -u origin main
```

Reemplazá `TU_USUARIO` por tu usuario real de GitHub. Si Git no tiene identidad configurada, establecé `git config --global user.name "Tu Nombre"` y `git config --global user.email "tu_correo@example.com"` antes de hacer el commit. Si aparece autenticación, seguí el inicio de sesión que muestre GitHub/Git Credential Manager.

6. Abrí la URL de tu repo desde otro navegador o ventana privada para comprobar que se puede ver el `README.md` y las carpetas `frontend`, `backend`, `db` y `docs`.
7. Copiá la **URL verificada del repositorio** en la actividad final del Campus GT.

## Si usás GitHub Desktop

Abrí la carpeta local como repositorio nuevo, hacé el commit inicial, elegí **Publish repository** y confirmá que sea público. Copiá la URL final desde GitHub.

## Importante

- **No subas** `backend/.env`, contraseñas, `node_modules` ni carpetas `.git` copiadas de otros proyectos.
- `backend/.env.example` sí debe incluirse, porque contiene variables de ejemplo sin secretos reales.
- El laboratorio `revisor-lab` contiene código intencionalmente vulnerable para enseñar a revisar; **nunca lo uses como backend de producción**.
- GitHub Actions ejecuta los tests automáticamente al subir el proyecto si GitHub puede descargar sus dependencias.
- Asegurate de haber ejecutado la app con MySQL localmente; las pruebas unitarias no garantizan por sí solas que los endpoints estén conectados.
