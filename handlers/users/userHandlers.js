const fetch = require('node-fetch')

const userApiUrl = "http://localhost:8080"
//show users
exports.showUsers = async () => {
    const apiCall = await fetch(userApiUrl)
    const jsonData = await apiCall.json()
    return jsonData;
}

//register users
exports.registerNewUser = async (nombre, apellido, nombre_de_usuario, email) => {
	const newUser = {
		nombre,
		apellido, 
		nombre_de_usuario,
		email
	}
	const apiCall = await fetch(userApiUrl+"/register", {
		method: 'post',
		body: JSON.stringify(newUser),	
		headers: {
			"content-type": "application/json"
		}
	})
	const response = await apiCall.json()
	return response
}

//signin users
exports.signInUser = async (email) => {
	const apiCall = await fetch(userApiUrl+"/signin", {
		method: 'post',
		body: JSON.stringify({email}),
		headers: {
			"content-type": "application/json"
		}
	})
	const response = await apiCall.json()
	return response;
}
