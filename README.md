# chatify_server

El server cuenta con 2 APIs rest echas en NODE JS usando Express para las rutas. 

Una API es de usuarios y otra de mensajes, ambas persisten la data en una base de datos MySQL y luego son llamadas por el server usando node-fetch.

LIBRERIAS UTILIZADAS
* express
* body-parser
* mysql
* moment
* cors
* localStorage
* node-fetch

*******BASE DE DATOS USUARIOS******

  * Id de usuario
  * Nombre
  * Apellido
  * Nombre de usuario
  * Email (que debe ser unico)
  * Fecha de creacion del usuario
  * Fecha de actualizacion del usuario si este es modificado
  * Id status (con una foreign key que establece una relacion a otra tabla llamada "status_usuarios". Si el usuario esta desconectado esta vale 1 si esta conectado vale 2)
  
  *******BASE DE DATOS STATUS_USUARIOS******
  
  * Id status (con una foreign key que establece una relacion a otra tabla llamada "usuarios". Si el usuario esta desconectado esta vale 1 si esta conectado vale 2)
  * Descripcion
  
  *******BASE DE DATOS MENSAJES******
  
  * Id de mensaje
  * Cuerpo del mensaje
  * Fecha de creacion
  * Fecha de actualizacion si es modificado
  * Id del usuario que lo crea
  * Id status (con una foreign key que establece una relacion a otra tabla llamada "status_mensajes". Si el mensaje fue leido vale 1 si no fue leido aun vale 2)
  
  *******BASE DE DATOS STATUS_MENSAJES******
  
  * Id status (con una foreign key que establece una relacion a otra tabla llamada "mensajes". Si el mensaje fue leido vale 1 si no fue leido aun vale 2)
  * Descripcion
  
  
  
  
