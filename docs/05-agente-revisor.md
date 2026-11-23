# 5. Agente revisor de código y medición

## Agente

Se definió un subagente Claude Code en `.claude/agents/revisor.md`, con las propiedades `readonly: true` y foco en seguridad/robustez. Debe evaluar: validación de entradas, tolerancia a fallos, crecimiento y permisos, y no cambiar archivos.

## Actividad: “Medí tu revisor”

Se incluye **un laboratorio separado** (`revisor-lab/`) con cinco archivos de prueba: tres con defectos intencionales conocidos y dos considerados sanos. Esto evita mezclar ejemplos vulnerables con la aplicación principal.

La tabla de predicciones se guardó en `revisor-lab/pruebas/expectativas.json` y la modificación de una línea entre instrucciones está en `revisor-lab/versiones/revisor_antes.md` y `revisor_despues.md`.

| Archivo del laboratorio | Predicción previa | Corrida 1: detector local | Corrida 2: detector local |
|---|---|---|---|
| `js/script.js` | XSS por interpolar datos sin escapar en `innerHTML` | Acertó | Acertó |
| `backend/config/database.js` | Credenciales root/contraseña vacía en código | Acertó | Acertó |
| `backend/repositories/heroRepository.js` | SQL construido mediante interpolación | Acertó | Acertó |
| `backend/controllers/heroController.js` | Archivo sano: sin hallazgos justificados | Falló (alerta especulativa) | Acertó |
| `backend/routes/heroRoutes.js` | Archivo sano: sin hallazgos justificados | Falló (alerta especulativa) | Acertó |

- **Primera corrida del verificador estático local: 3/5.**
- **Segunda corrida del verificador estático local: 5/5.**
- **Cambio de una línea:** instrucción para no marcar errores sin evidencia verificable.
- **Variación:** subió 2 puntos; dejó de señalar falsos positivos en Controller y Routes.

### Límite de esta medición (importante)

Esos números provienen de **un script determinista de demostración ejecutado en dos procesos**, NO de dos chats nuevos del agente de IA. No sería honesto atribuir los resultados 3/5 → 5/5 al modelo. La consigna original exige repetir la evaluación real con el subagente en dos chats nuevos: esas dos sesiones todavía no se ejecutaron ni se inventó su resultado.

Para completar esa condición: seguir `revisor-lab/README.md`; las dos ejecuciones del agente pueden dar resultados diferentes del detector local. Guardar capturas o salidas del agente y actualizar esta tabla con los valores reales de IA.
