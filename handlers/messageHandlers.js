const axios = require('axios')

const messageApiUrl = "http://localhost:9090"

//show all messages
exports.showMessages = async () => {
    try{
        const apiCall = await axios.get(messageApiUrl)
        return apiCall.data;
    }catch(err){
        return err 
    }
}

//send new message
exports.sendNewMessage = async (cuerpo, id_usuario) => {
    try{
        const apiCall = await axios.post(messageApiUrl+"/messages",{cuerpo, id_usuario})
        return apiCall.data
    }catch(err){
        return err
    }
}

//update message read
exports.messageRead = async (id_mensaje) => {
    try{
        const apiCall = await axios.patch(messageApiUrl+"/messages",{id_mensaje})
        return apiCall.data
    }catch(err){
        return err
    }
}
//delete a message
exports.deleteMessage = async (id_mensaje) => {
    try{
        const apiCall = await axios.delete(messageApiUrl+"/messages",{data: {id_mensaje}})
        return apiCall.data;
    }catch(err){
        return err;
    }
}