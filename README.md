# API de Criaturas Mágicas

Esta API permite gestionar criaturas mágicas con diferentes rarezas. Está desarrollada con **Node.js**, **Express** y **MongoDB** usando Mongoose.

## Endpoints principales para criaturas

- `GET /criaturas` – Lista todas las criaturas.
- `POST /criaturas` – Crea una nueva criatura.
- `GET /criaturas/:id` – Obtiene una criatura por su id.
- `PUT /criaturas/:id` – Actualiza una criatura existente.
- `DELETE /criaturas/:id` – Elimina una criatura.

Cada criatura posee los siguientes atributos:

- `nombre`: nombre de la criatura
- `rareza`: una de `comun`, `poco comun`, `raro`, `epico`, `legendario`
- `ataques`: arreglo de tres ataques

## Endpoints principales para usuarios

- `GET /usuarios` – Lista todas las criaturas.
- `POST /usuarios` – Crea una nueva criatura.
- `GET /usuarios/:id` – Obtiene una criatura por su id.
- `PUT /usuarios/:id` – Actualiza una criatura existente.
- `DELETE /usuarios/:id` – Elimina una criatura.

Cada criatura posee los siguientes atributos:

- `nombre`: nombre del usuario
- `alias`: alias del usuario
- `email`: email del usuario
- `password`: contraseña del usuario
- `nivel`: nivel del usuario
- `acumulado`: numeor de mounstros derrotados para subir de nivel del usuario
- `victoria`: victorias del usuario
- `derrota`: derrotas del usuario
- `empate`: empates del usuario
- `unlocked`: lista de IDs de criaturas desbloqueadas
  
## Puesta en marcha

1. Asegúrate de tener MongoDB corriendo y define la variable `MONGODB_URI` si deseas usar otra conexión.
2. Instala las dependencias con `npm install` (requiere acceso a internet).
3. Ejecuta `npm run dev` para iniciar el servidor en modo de desarrollo.

La API quedará disponible en `https://backend-api-criaturas.onrender.com/criaturas`.

## Mejoras para un futuro

1. Encriptar la contraseña ya que esta en texto plano
2. Comprobar en el registro si el email esta ya dado de alta
3. Seccionar el codigo para que quede mas limpio
