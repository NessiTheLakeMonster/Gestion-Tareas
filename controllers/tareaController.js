const {response, request} = require('express');
const Conexion = require('../database/conexionTarea.js');

const tareasGet = async (req = request, res = response) => {
    const conx = new Conexion();

    conx.getTareas()
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

const tareasGetById = async (req = request, res = response) => {
    const conx = new Conexion();

    conx.getTareasById(req.params.id)
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

const postTarea = async (req = request, res = response) => {
    const conx = new Conexion();

    conx.registrarTarea(req.body)
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
    tareasGet,
    tareasGetById,
    postTarea
}