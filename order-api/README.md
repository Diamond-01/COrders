# Order Builder API

API Backend para la gestión y persistencia de plantillas de órdenes.

## Requisitos Previos
- Node.js
- PostgreSQL (Base de datos llamada `corders`)

## Instalación
1. Clonar repositorio.
2. Entrar a `order-api`: `cd order-api`
3. Instalar dependencias: `npm install`
4. Configurar `.env` (ver abajo).

## Variables de Entorno (.env)
Crear archivo `.env` en la raíz con:
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=corders
DB_USER=postgres
DB_PASSWORD=tu_password

## Scripts
- `npm run dev`: Inicia el servidor.
- `npm start`: Inicia el servidor (producción).

## Endpoints
- **POST /api/orders**: Crea una orden. Requiere JSON con `title` y `fields` (cada field con `id`, `type`, `order`, `props`).
- **GET /api/orders**: Lista todas las órdenes.
- **GET /api/orders/:id**: Obtiene una orden por ID.