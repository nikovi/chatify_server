const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userHandlers = require('./handlers/userHandlers');
const messageHandlers = require('./handlers/messageHandlers');

const app = express();
app.use(bodyParser.json());
app.use(cors());

 //////////////////////////////////////////// USERS ENDPOINTS //////////////////////////////////////

//show users
app.get("/users", async (req, res) => {
   	const data = await userHandlers.showUsers();
   	res.json(data)
})

//register a new user
app.post("/register", async (req, res) => {
	const {nombre, apellido, nombre_de_usuario, email} = req.body
	const registeredUser = await userHandlers.registerNewUser(nombre, apellido, nombre_de_usuario, email)
	res.json(registeredUser);
})

//signin a user
app.post("/signin", async (req, res) => {
	const signedUser = await userHandlers.signInUser(req.body.email)
	res.json(signedUser)
})

//delete a user
app.delete("/users", async (req, res) => {
	const deletedUser = await userHandlers.deleteUser(req.body.id_usuario);
	res.json(deletedUser);
})

//signout a user
app.post("/signout", async (req, res) => {
	const signedOutUser = await userHandlers.signoutUser(req.body.id_usuario)
	res.json(signedOutUser)
})

//////////////////////////////////////////// MESSAGES ENDPOINTS //////////////////////////////////////

//show messages
app.get("/messages", async (req, res) => {
    const data = await messageHandlers.showMessages();
   	res.json(data)
})

//send new message
app.post("/messages/:id_usuario", async (req, res) => {
	const newMessage = await messageHandlers.sendNewMessage(req.body.cuerpo, req.params.id_usuario)
	res.json(newMessage)
})

//update read message
app.patch("/messages", async (req, res) => {
	const readMessage = await messageHandlers.messageRead(req.body.id_mensaje)
	res.json(readMessage)
})

//delete a message
app.delete("/messages", async (req, res) => {
	const deletedMessage = await messageHandlers.deleteMessage(req.body.id_mensaje);
	res.json(deletedMessage);
})

//////////////////////////// server listen ////////////////////////////

app.listen(3000, () => {
    console.log('Server up on port 3000')
})