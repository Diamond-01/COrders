-- 001_sample_order.sql
-- Ejemplo de inserción de una orden dinámica

INSERT INTO orders (title, schema)
VALUES (
    'Orden de prueba',
    '{
        "fields": [
            {
                "id": "1",
                "type": "text",
                "order": 1,
                "props": {
                    "label": "Nombre del cliente",
                    "required": true
                }
            },
            {
                "id": "2",
                "type": "number",
                "order": 2,
                "props": {
                    "label": "Cantidad",
                    "min": 1
                }
            }
        ]
    }'::jsonb
);
