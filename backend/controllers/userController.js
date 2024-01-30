const { response, request } = require('express');
const Conexion = require('../database/conexionUsuario.js');
const bcrypt = require('bcrypt');

const usuariosGet = async (req = request, res = response) => {
    const conx = new Conexion();

    conx.getUsuarios()
        .then((resultado) => {
            res.json({
                ok: true,
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                error
            });
        });
}

const usuariosGetById = async (req = request, res = response) => {
    const conx = new Conexion();

    conx.getUsuarioById(req.params.id)
        .then((resultado) => {
            res.json({
                ok: true,
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                error
            });
        });
}

const cifrarPasswd = async (password) => {
    return bcrypt.hash(password, 10);
}

const usuariosPost =  async (req = request, res = response) => {
    const conx = new Conexion();
    const body = req.body;
    body.password = await cifrarPasswd(body.password);

    conx.registrarUsuario(body)
        .then(msg => {
            console.log(body);
            console.log('Insertado correctamente!');
            res.status(201).json(msg);
        })
        .catch(err => {
            console.log(err);
            console.log('Fallo en el registro!');
            res.status(203).json(err);
        });
}

const usuariosPut = async (req = request, res = response) => {
    const conx = new Conexion();

    conx.modificarUsuario(req.params.id, req.body)
        .then((resultado) => {
            res.json({
                ok: true,
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                error
            });
        });
}

const usuariosDelete = async (req = request, res = response) => {
    const conx = new Conexion();

    conx.borrarUsuario(req.params.id)
        .then((resultado) => {
            res.json({
                ok: true,
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                error
            });
        });
}

module.exports = {
    usuariosGet,
    usuariosGetById,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}