## API de Gestión de Inscripción de Turnos
### Descripción
Esta API permite gestionar la inscripción de turnos de alumnos. Los alumnos pueden registrarse o iniciar sesión para acceder a funcionalidades protegidas como seleccionar turnos. Utiliza MongoDB para la base de datos y `express-validator` para la validación de datos.

### Características principales
##### Registro y autenticación de usuarios

- Los usuarios deben registrarse proporcionando sus datos.
- Autenticarse con un token JWT para acceder a rutas protegidas.

##### Gestión de turnos
- Obtener todos los turnos disponibles.
- Consultar detalles de un turno específico.
- Crear nuevos turnos.
- Actualizar información de turnos existentes.
- Eliminar turnos.

### Requisitos previos
##### - Registro y autenticación
Para utilizar la API, primero necesitas registrarte. Luego, al iniciar sesión, obtendrás un token JWT que deberás incluir en la cabecera `Authorization` como:

`authorization: bearer <token>`

##### - Validaciones
Los datos enviados en las solicitudes son validados con `express-validator`. Si hay errores, se devolverá una respuesta con los detalles de las fallas.

### Endpoints disponibles
#### Registro de usuarios
- Ruta: **/api/auth/register**
- Método: **POST**
- Cuerpo de la solicitud (JSON):

```json
{
  "username": "nombre_de_usuario",
  "password": "contraseña_segura"
}
```
#### Inicio de sesión
- Ruta: **/api/users/login**
- Método: **POST**
- Cuerpo de la solicitud (JSON):

```json
{
  "email": "correo@ejemplo.com",
  "password": "contraseña_segura"
}
```
- Respuesta (en caso de éxito):

```json
{
  "token": "jwt_generado"
}
```
#### Gestión de turnos
##### a)Obtener todos los turnos

Ruta: `/api/turnos`
Método: `GET`
##### b) Obtener turno por ID

Ruta: `/api/turnos/:id`
Método: `GET`
##### c) Crear un nuevo turno

Ruta: `/api/turnos`
Método: `POST`
Cuerpo de la solicitud (JSON):

```json
{
  "name": "Nombre del turno",
  "hours": "Horario del turno",
  "profesor": "Nombre del profesor"
}
```
##### d) Actualizar un turno existente

Ruta: `/api/turnos/:id`
Método: `PUT`
Cuerpo de la solicitud (JSON):

```json
{
  "name": "Nombre actualizado del turno",
  "hours": "Horario actualizado",
  "profesor": "Profesor actualizado"
}
```
##### e) Eliminar un turno

Ruta: `/api/turnos/:id`
Método: `DELETE`

#### Tecnologías utilizadas
- Backend
	- Node.js con Express.js
- Base de datos:
	- MongoDB
	- Mongoose (ODM)
- Seguridad y autenticación:
	- JSON Web Tokens (JWT)
	- bcryptjs (hashing de contraseñas)
- Validación:
	- express-validator
