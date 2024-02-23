const { response } = require('express');
const Conexion = require('../database/conexionUsuario');

const esAdmin = (req, res, next) => {
    const conx = new Conexion();

    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    conx.checkRol(req.usuario.uid, "admin")
        .then(resultado => {
            if (resultado) {
                next();
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: 'El usuario no es administrador'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        });
}

const esProgramador = (req, res, next) => {
    const conx = new Conexion();

    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    conx.checkRol(req.usuario.uid, "programador")
        .then(resultado => {
            if (resultado) {
                next();
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: 'El usuario no es administrador'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        });
}

module.exports = {
    esAdmin,
    esProgramador
} 