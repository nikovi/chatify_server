const axios = require('axios')

const userApiUrl = "http://localhost:8080"
//show users
exports.showUsers = async () => {
    try{
        const apiCall = await axios.get(userApiUrl)
        return apiCall.data;
    }catch(err){
        console.log(err) 
    }
}

//register users
exports.registerNewUser = async (nombre, apellido, nombre_de_usuario, email) => {
    try{
        const apiCall = await axios.post(userApiUrl+"/register",{
            nombre, 
            apellido,
            nombre_de_usuario,
            email
        })
        return apiCall.data;
    }catch(err){
        console.log(err)
    }
        
}

//signin users
exports.signInUser = async (email) => {
    try{
        const apiCall = await axios.post(userApiUrl+"/signin",{email})
        return apiCall.data;
    }catch(err){
        console.log(err);
    }
}