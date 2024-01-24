const { response, request } = require('express');
const Conexion = require('../database/conexionUsuario.js');
const { generarJWT } = require('../helpers/generate_jwt')

const login = (req, res = response) => {

    const { email, password } = req.body;
    console.log('Email: ' + email);
    try {
        //Verificar si existe el usuario.
        const conx = new Conexion();
        u = conx.login(email, password)
            .then(usu => {
                if (usu) {
                    console.log('Usuario correcto!  ' + usu.email);
                    const token = generarJWT(usu.email)
                    console.log(usu)
                    console.log(token);
                    res.status(200).json({ usu, token });
                } else {
                    console.log('No hay registro de ese usuario.');
                    res.status(400).json({ 'msg': 'Login incorrecto.' });
                }
            })
            .catch(err => {
                console.log(err);
                console.log('No hay registro de ese usuario.');
                res.status(500).json({ 'msg': 'Login incorrecto.' });
            });


        //res.status(200).json({'msg':'Login ok', DNI, Clave});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ 'msg': 'Error en el servidor.' });
    }

}

module.exports = {
    login
}