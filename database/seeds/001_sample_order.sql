-- 001_sample_order.sql
-- Rol: Backend - Base de Datos
-- Objetivo: insertar un registro de ejemplo en la tabla orders
-- Nota: este archivo es SOLO para pruebas locales o entornos de desarrollo

INSERT INTO orders (
    title,
    schema
) VALUES (
    'Orden de prueba - formulario dinámico',
    '{
        "version": "1.0",
        "type": "dynamic-order",
        "fields": [
            {
                "id": "customer_name",
                "type": "text",
                "order": 1,
                "props": {
                    "label": "Nombre del cliente",
                    "required": true,
                    "placeholder": "Ingrese el nombre completo"
                }
            },
            {
                "id": "quantity",
                "type": "number",
                "order": 2,
                "props": {
                    "label": "Cantidad",
                    "required": true,
                    "min": 1
                }
            }
        ],
        "metadata": {
            "created_by": "system",
            "environment": "development"
        }
    }'::jsonb
);