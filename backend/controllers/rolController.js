const {response, request} = require('express');
const Conexion = require('../database/conexionRol.js');

const asignarAdmin = async (req = request, res = response) => {
    const conx = new Conexion();

    conx.asignarAdmin(req.params.id)
        .then(msg => {
            console.log('Insertado correctamente!');
            res.status(201).json(msg);
        })
        .catch(err => {
            console.log(err);
            console.log('Fallo en el registro!');
            res.status(203).json(err);
        });
}

module.exports = {
    asignarAdmin
}