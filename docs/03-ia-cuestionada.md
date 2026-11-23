# 3. Decisiones de la IA que cuestioné

Al evaluar el primer diseño de la entidad **Héroes**, cuestioné varias propuestas de la IA para mejorar la estructura y evitar datos innecesarios.

1. **`edad` → `fecha_nacimiento`:** preferí guardar un dato más estable en lugar de una edad que puede quedar desactualizada. Como el lore puede no incluir el año exacto, los valores iniciales son **estimaciones**, no fechas oficiales confirmadas.
2. **Separar `habilidades`:** en vez de poner todas las habilidades en un campo ambiguo, creé la entidad `habilidades`, porque un héroe puede tener varias y cada una tiene nombre, tipo y descripción.
3. **Agregar `perks`:** la propuesta original omitía las mejoras que se eligen durante la partida. Por eso incorporé una tabla independiente `perks` con su nivel asociado al héroe.
4. **`historia` → `descripcion`:** una descripción permite guardar información general y no solamente la historia del personaje.
5. **Eliminar `estado`:** no estaba definido qué significaba “activo” (disponible, vivo en el lore, habilitado en competitivo, etc.) y no era necesario para la funcionalidad.
6. **Conservar `imagen`:** inicialmente propuse eliminarla, pero después resolví conservarla como `VARCHAR(255)` para guardar una **ruta o URL**, no la imagen binaria. Esto facilita cargar las tarjetas desde MySQL.
7. **Eliminar `opcion` de perks:** cada perk ya es una fila distinta, así que no es necesario fijar columnas de opción A/B; se agrupan por héroe y nivel.

**Conclusión:** el uso de IA fue crítico. No acepté automáticamente las primeras decisiones, sino que las revisé según las necesidades reales de WikiWatch.
