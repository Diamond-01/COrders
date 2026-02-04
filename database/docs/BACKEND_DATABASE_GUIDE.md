# 🗄️ Backend – Base de Datos  
## 📦 Sistema de Órdenes Dinámicas (COrders)

---

## 📌 Introducción

Este documento describe el **diseño, configuración y uso** del módulo **Backend – Base de Datos** del proyecto **COrders**.

El objetivo de este módulo es **almacenar órdenes dinámicas creadas desde un frontend**, utilizando **PostgreSQL** y el tipo de dato **JSONB**, sin normalizar campos ni interpretar la estructura del formulario.

Esta documentación permite a cualquier integrante del equipo:

- Comprender el diseño de la base de datos  
- Ejecutar PostgreSQL desde VS Code usando PowerShell  
- Aplicar migraciones y seeds  
- Visualizar correctamente el campo `schema`  
- Verificar el correcto funcionamiento del sistema  

---

## 🎯 Objetivo del Diseño

Diseñar una base de datos que permita:

- Almacenar formularios dinámicos completos  
- Soportar cambios en la estructura del frontend sin modificar la base de datos  
- Evitar la normalización de campos  
- Evitar lógica de negocio en la base de datos  
- Mantener un diseño flexible y escalable  

**Regla fundamental:**  
> Si el frontend cambia la estructura del formulario, la base de datos **no requiere modificaciones**.

---

## 🧠 Enfoque Técnico

- **Gestor de base de datos:** PostgreSQL  
- **Tipo de dato principal:** JSONB  
- **Entorno:** PostgreSQL local en Windows  
- **Herramienta de acceso:** psql  
- **Docker:** Opcional  

La base de datos **no valida ni interpreta** el contenido del formulario.  
La estructura del JSON es responsabilidad exclusiva del frontend.

---

## 🗂️ Estructura del Módulo Database

```text
database/
├── migrations/
│   ├── 001_create_orders.sql
│   └── 002_indexes.sql
├── seeds/
│   └── 001_sample_order.sql
├── docker-compose.yml
└── README.md
```

Los directorios contienen únicamente scripts SQL y documentación.
Los datos reales se almacenan dentro de PostgreSQL, no en el sistema de archivos.


## 🧱 Modelo de Datos
La tabla principal del sistema es orders, encargada de almacenar cada orden generada desde el frontend.

Campo	Tipo	Descripción
```
id	UUID	Identificador único de la orden
title	VARCHAR	Nombre opcional de la orden
schema	JSONB	Formulario dinámico completo
created_at	TIMESTAMP	Fecha de creación
updated_at	TIMESTAMP	Fecha de actualización
```

## 🧩 El Campo schema (JSONB)
El campo schema es una columna de tipo JSONB que almacena el formulario completo generado dinámicamente por el frontend.

Este campo permite:
- Guardar cualquier estructura de formulario
- Cambiar campos sin afectar la base de datos
- Mantener flexibilidad a largo plazo
- El campo schema no es un archivo, no es una carpeta, no es un esquema SQL y no es una tabla adicional.
- Es únicamente una columna JSONB dentro de la tabla orders.

## ❓ ¿Por qué el campo schema no se ve en el directorio?
- Los directorios del proyecto solo contienen scripts SQL.
- Los datos se almacenan dentro de PostgreSQL y se consultan mediante SQL.
---
## 💻 Uso de PostgreSQL desde VS Code (PowerShell)
Requisitos
- PostgreSQL instalado en Windows
- Servicio PostgreSQL activo
- Acceso a psql.exe
Ruta típica:
```
C:\Program Files\PostgreSQL\16\bin\psql.exe
```
Verificar instalación:
```
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" --version
```
# ▶️ Ejecución Paso a Paso
## Crear base de datos

## Ejecutar migraciones
```
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d corders -f migrations/001_create_orders.sql
```
```
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d corders -f migrations/002_indexes.sql
```
## Insertar datos de prueba
```
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d corders -f seeds/001_sample_order.sql
```
## 🔎 Verificación
Listar tablas:
```
\dt
```
## Ver estructura de la tabla:
```
\d orders
```

# Consultar el formulario almacenado:
```
SELECT schema FROM orders;
```
## 🐳 Uso de Docker (Opcional)
Docker no es obligatorio para este módulo.
El sistema fue validado utilizando PostgreSQL local.
Su uso no afecta el diseño ni el modelo basado en JSONB.

## 🏁 Conclusión
El módulo Backend – Base de Datos fue implementado correctamente.
El diseño permite almacenar órdenes dinámicas de forma flexible, escalable y desacoplada del frontend, utilizando PostgreSQL y JSONB.

El campo schema almacena el formulario completo sin validación ni interpretación, cumpliendo el principio de independencia entre frontend y base de datos.