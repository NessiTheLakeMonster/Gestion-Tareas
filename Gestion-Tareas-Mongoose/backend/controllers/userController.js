const UserModel = require('../models/usuarioMongoose.js');
const Conexion = require('../database/conexionUsuario.js');

const listarUsuarios = async (req, res) => {
    const conx = new Conexion();

    conx.getUsuarios()
        .then((resultado) => {
            res.json({
                ok: true,
                'msg': 'Listado de usuarios:',
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                'msg': 'Error a la hora de listar los usuarios:',
                error
            });
        });
}

const registroUsuario = async (req, res) => {
    const conx = new Conexion();
    const body = req.body;

    conx.postUsuario(req.body.nombre, req.body.apellido, req.body.email, req.body.password)
        .then(msg => {
            console.log(body);
            console.log('Insertado correctamente!');
            res.status(201).json({
                'ok': true,
                'msg': 'Usuario registrado correctamente!'
            });
        })
        .catch(err => {
            console.log(err);
            console.log('Fallo en el registro!');
            res.status(203).json({
                'ok': false,
                'msg': 'Fallo en el registro!'
            });
        });
}

const loginUsuario = async (req, res) => {
    const conx = new Conexion();

    conx.loginUsuario(req.body.email, req.body.password)
        .then((resultado) => {
            res.status(200).json({
                ok: true,
                'msg': 'Usuario logueado correctamente:',
                resultado
            });
        })
        .catch((error) => {
            res.status(400).json({
                ok: false,
                'msg': 'Login incorrecto:',
                error
            });
        });
}

module.exports = {
    listarUsuarios,
    registroUsuario,
    loginUsuario
}