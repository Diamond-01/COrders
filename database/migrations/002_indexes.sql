-- 002_indexes.sql
-- Índices para optimizar consultas sin comprometer la flexibilidad del modelo

CREATE INDEX IF NOT EXISTS idx_orders_created_at
ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_orders_schema
ON orders USING GIN (schema);
 