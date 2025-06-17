# GDD - F.O.C.A.: Felicidad y Ocio Con Amigos

Álvaro Codorníu Alonso
Diego Gómez Martín

## MÉTODOS REST EMPLEADOS

1. POST /users/register
- recibe: {User(username, password)}
- efecto: añade a la base de datos (archivo .txt) un nuevo usuario, estableciendo su puntuación en 0.

2. POST /users/login
- recibe: {User(username, password)}
- efecto: comprueba las credenciales y si son correctas devuelve un token.

3. GET /users/score/{username}
- efecto: devuelve la puntuación del usuario proporcionado.

4. POST /users/updateScore
- recibe: {String: username}
- efecto: actualiza la puntuación del usuario proporcionado.

5. PUT /users/changePassword
- recibe: {String: token}
- efecto: cambia la contraseña de un usuario.

6. DELETE /users/delete/{username}
- recibe: {String: username}
- efecto: borra por completo del servidor la cuenta del usuario proporcionado.

7. GET /chat
- {@RequestParam(defaultValue = "0") int since} : "since" marca a partir desde qué ID se retornan los mensajes.
- efecto: se devuelve una lista con todos los mensajes desde el ID de mensaje proporcionado.

8. POST /chat
- recibe: {String: message}
- efecto: envía al servidor un mensaje que mostrará cuando se haga el GET correspondiente del chat.