const { response } = require('express');

const esAdmin = (req, res, next) => {
    if (req.usuario.roles === 'admin') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            msg: 'El usuario no es administrador'
        });
    }
}

module.exports = esAdmin;