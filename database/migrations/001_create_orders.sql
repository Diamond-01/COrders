-- 001_create_orders.sql
-- Rol: Backend - Base de Datos
-- Objetivo: almacenar órdenes dinámicas sin interpretar la estructura del formulario

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    schema JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Nota:
-- El campo schema almacena el JSON completo generado por el frontend.
-- No se normalizan campos ni se aplica lógica de negocio en la base de datos.
-- Esto permite flexibilidad para manejar diferentes tipos de órdenes sin cambios en la estructura de la tabla.
-- Se recomienda manejar la validación y lógica de negocio en la capa de aplicación.

