const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const moment = require('moment')
const cors = require('cors')

const date = moment().format("YYYY-MM-DD HH:mm:ss");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "fizzchat",
    password: "password"
  });
  
const app = express();

app.use(bodyParser.json())
app.use(cors())

//todos los mensajes
app.get("/", (req, res) => {
    con.query(`SELECT * FROM mensajes`, (err, result) => {
        if(err){
            return res.status(500).json('database malfunction')
        }
    res.send(result)
    })
})

//nuevo mensaje
app.post("/messages/:id_usuario", (req, res) => {
    const {id_usuario} = req.params;
    const {cuerpo} = req.body;
    if(!cuerpo || !id_usuario){
        return res.status(400).json('No data provided')
    }
    con.query(`INSERT INTO mensajes (cuerpo, creado_en, actualizado_en, id_usuario) VALUES ('${cuerpo}', '${date}', '${date}', '${id_usuario}')`, (err, result) => {
        if(err){
            return res.status(400).json('Could not send message')
        }
        return res.status(200).json('Message send!')
    })
})

//actualizar mensaje leido
app.put('/messages', (req, res) => {
    const {id_mensaje} = req.body;
    if(!id_mensaje){
        return res.status(400).json('no data provided')
    }
    con.query(`UPDATE mensajes SET id_status = 2 WHERE id_mensaje = '${id_mensaje}'`, (err, result) => {
        if(err){
            return res.status(400).json('Message has not been read')
        }
        console.log(result)
        return res.status(200).json('Message has been read')
    })
})

//Borrar un mensaje
app.delete("/messages", (req, res) => {
    const {id_mensaje} = req.body
    if(!id_mensaje){
        return res.status(400).json('No data has been provided')
    }
    con.query(`DELETE FROM mensajes WHERE id_mensaje = '${id_mensaje}'`, (err, result) => {
        if(err){
            return res.status(500).json('Could not delete message')
        }
        return res.status(200).json("Message was deleted!")
    })
})

con.connect(err =>  {
    if (err){
        console.log(err);
    } 
    console.log("db Connected!");
    app.listen(9090, () => {
        console.log('message API up on port 9090')
    })
});