# API de Criaturas Mágicas

Esta API permite gestionar criaturas mágicas con diferentes rarezas. Está desarrollada con **Node.js**, **Express** y **MongoDB** usando Mongoose.

## Endpoints principales

- `GET /criaturas` – Lista todas las criaturas.
- `POST /criaturas` – Crea una nueva criatura.
- `GET /criaturas/:id` – Obtiene una criatura por su id.
- `PUT /criaturas/:id` – Actualiza una criatura existente.
- `DELETE /criaturas/:id` – Elimina una criatura.

Cada criatura posee los siguientes atributos:

- `nombre`: nombre de la criatura
- `rareza`: una de `comun`, `poco comun`, `raro`, `epico`, `legendario`
- `ataques`: arreglo de tres ataques

## Puesta en marcha

1. Asegúrate de tener MongoDB corriendo y define la variable `MONGODB_URI` si deseas usar otra conexión.
2. Instala las dependencias con `npm install` (requiere acceso a internet).
3. Ejecuta `npm run dev` para iniciar el servidor en modo de desarrollo.

La API quedará disponible en `https://backend-api-criaturas.onrender.com/criaturas`.
