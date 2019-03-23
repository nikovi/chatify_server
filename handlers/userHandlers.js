const axios = require('axios')

const userApiUrl = "http://localhost:8080"

//show users
exports.showUsers = async () => {
    try{
        const apiCall = await axios.get(userApiUrl)
        return apiCall.data;
    }catch(err){
        return err 
    }
}

//register a user
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
        return err
    }
}

//signin users
exports.signInUser = async (email) => {
    try{
        const apiCall = await axios.post(userApiUrl+"/signin", {email})
        return apiCall.data;
    }catch(err){
        return err
    }
}

//delete a user
exports.deleteUser = async (id_usuario) => {
    try{
        const apiCall = await axios.delete(userApiUrl+"/users",{data: {id_usuario}})
        return apiCall.data;
    }catch(err){
        return err
    }
}

//logout user
exports.signoutUser = async (id_usuario) => {
    try{
        const apiCall = await axios.post(userApiUrl+"/signout", {id_usuario})
        return apiCall.data
    }catch(err){
        return err
    }
}