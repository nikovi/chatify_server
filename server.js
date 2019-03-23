const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userHandlers = require('./handlers/users/userHandlers');

const app = express();

app.use(bodyParser.json())
app.use(cors());

const messageApiUrl = "http://localhost:9090"

const showMessages = async () => {
    const apiCall = await fetch(messageApiUrl)
    const jsonData = await apiCall.json()
    return jsonData;
}

 //////////////////////////////////////////// USERS ENDPOINTS //////////////////////////////////////

//root user endpoint
app.get("/users", async (req, res) => {
   	const data = await userHandlers.showUsers();
   	res.status(200).json(data)
})

//register a new user
app.post("/register", async (req, res) => {
	const {nombre, apellido, nombre_de_usuario, email} = req.body
	const registeredUser = await registerNewUser(nombre, apellido, nombre_de_usuario, email)
	res.json(registeredUser);
})

//signin users
app.post("/signin", async (req, res) => {
	const email = req.body.email
	const signedUser = await signInUser(email)
	res.json(signedUser)
})

//////////////////////////////////////////// MESSAGES ENDPOINTS //////////////////////////////////////

//Root messages endpoint
app.get("/messages", async (req, res) => {
    const data = await showMessages();
   	res.status(200).json(data)
})

app.listen(3000, () => {
    console.log('Server up on port 3000')
})