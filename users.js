const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const moment = require('moment')
const localStorage = require('localStorage')
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
app.use(cors());

const saveToLocalStorage = async (id_usuario, nombre_de_usuario, id_status) => {
    let user = await {
        id: id_usuario,
        username: nombre_de_usuario,
        idStatus: id_status
    }
    localStorage.setItem('userData', JSON.stringify(user))
}

// mostrar todos los usuarios
app.get('/', (req, res) => {
    con.query(`SELECT * FROM usuarios`, (err, result) => {
        if(err){
            return res.status(500).json('database malfunction')
        }
        res.send(result)
    })
})

//registrar usuarios
app.post('/register', (req, res) => {
    const {nombre, apellido, nombre_de_usuario, email} = req.body
    if(!nombre || !apellido || !nombre_de_usuario || !email){
        return res.status(400).json('Unable to register')
    }
    con.query(`INSERT INTO usuarios (nombre, apellido, nombre_de_usuario, email, creado_en, actualizado_en) 
    VALUES ('${nombre}', '${apellido}', '${nombre_de_usuario}', '${email}', '${date}', '${date}')`, err => {
        if(err){
            if(err.code === "ER_DUP_ENTRY"){
                return res.status(400).json('Email is already in use')
            }
            return res.status(500).json('Could not save to database')
        }
        con.query(`SELECT * FROM usuarios WHERE email = '${email}'`, (err, result) => {
            if(err){
                return res.status(500).json('Database error')
            }
            const user = result[0];
            con.query(`UPDATE usuarios SET id_status = 2 WHERE id_usuario = '${result[0].id_usuario}'`, (err) => {
                if(err){
                    return res.status(500).json('Update id_status failed')
                }
                let {id_usuario, nombre_de_usuario, id_status} = user;
                saveToLocalStorage(id_usuario, nombre_de_usuario, id_status);
                return res.status(200).json('Registered and signed in!')
            })
        })
    })
})

//signin de usuarios
app.post('/signin', function(req, res){
    const {email} = req.body
    if(!email){
        return res.status(400).json('You must enter your email to sign in')
    }
    con.query(`SELECT * FROM usuarios WHERE email='${email}'`, (err, result) => {
        if(err){
            return res.status(500).json('Could not get user from database')
        }else if(!result[0]){
            return res.status(400).json('No such user in database')
        }
        let user = result[0]
        con.query(`UPDATE usuarios SET id_status = 2, actualizado_en = '${date}' WHERE id_usuario = '${user.id_usuario}'`, (err, result) => {
            if(err){
                return res.status(500).json('Update id_status failed')
            }
            let {id_usuario, nombre_de_usuario, id_status} = user;
            saveToLocalStorage(id_usuario, nombre_de_usuario, id_status);
            return res.status(200).json('Signed in!')
        })
    })
})

//borrar un usuario
app.delete("/users", (req, res) => {
    const {id_usuario} = req.body
    if(!id_usuario){
        return res.status(400).json('User id was not provided')
    }
    con.query(`DELETE FROM usuarios WHERE id_usuario = '${id_usuario}'`, (err, result) => {
        if(err){
            return res.status(500).json('Could not delete user')
        }
        return res.status(200).json("User was deleted!")
    })
})

//logout
app.post("/signout", (req, res) => {
    const {id_usuario} = req.body
    if(!id_usuario){
        return res.status(400).json('User id was not provided')
    }
    con.query(`UPDATE usuarios SET actualizado_en = '${date}', id_status = '1' WHERE id_usuario = '${id_usuario}'`, (err, result) => {
        if(err){
            return res.status(500).json('Not able to logout')
        }
        console.log(result)
        localStorage.clear();
        return res.status(200).json('user has signed out')
    })
})

con.connect(err =>  {
    if (err){
        console.log(err);
    } 
    console.log("db Connected!");
    app.listen(8080, () => {
        console.log('Users API up on port 8080')
    })
});

