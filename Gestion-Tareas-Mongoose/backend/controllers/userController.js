const UserModel = require('../models/usuarioMongoose.js');
const Conexion = require('../database/conexionUsuario.js');
const { generarJWT } = require('../helpers/generate_jwt.js');

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

const buscarUsuario = async (req, res) => {
    const conx = new Conexion();

    conx.getUsuarioById(req.params.id)
        .then((resultado) => {
            res.json({
                ok: true,
                'msg': 'Usuario encontrado:',
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                'msg': 'Error a la hora de buscar el usuario:',
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
            res.status(400).json({
                'ok': false,
                'msg': 'Fallo en el registro!'
            });
        });
}

/* const loginUsuario = async (req, res) => {
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
} */

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const conx = new Conexion();
        u = await conx.loginUsuario(email, password)
            .then(user => {
                console.log(user);
                const token = generarJWT(user.id);
                res.status(200).json({
                    ok: true,
                    'msg': 'Usuario logueado correctamente:',
                    user,
                    token
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json({
                    ok: false,
                    'msg': 'Login incorrecto:',
                    error
                });
            });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const addRoles = async (req, res) => {
    const conx = new Conexion();
    const roles = req.body.roles;

    // Se comprueba que roles sea un array
    if (!Array.isArray(roles)) {
        return res.status(400).json({
            ok: false,
            msg: 'roles debe ser un array'
        });
    }

    conx.putRolesUsuario(req.params.id, roles)
        .then(msg => {
            console.log('Rol añadido correctamente!');
            res.status(201).json({
                'ok': true,
                'msg': 'Rol añadido correctamente!'
            });
        })
        .catch(err => {
            console.log(err);
            console.log('Fallo al añadir el rol!');
            res.status(203).json({
                'ok': false,
                'msg': 'Fallo al añadir el rol!'
            });
        });
}

const asignarTarea = async (req, res) => {
    const conx = new Conexion();
    const id = req.params.id;
    const tarea = req.params.tarea;


    conx.asignarTareaUsuario(id, tarea)
        .then(msg => {
            console.log('Tarea asignada correctamente!');
            res.status(201).json({
                'ok': true,
                'msg': 'Tarea asignada correctamente al usuario con id: ' + id
            });
        })
        .catch(err => {
            console.log(err);
            console.log('Fallo al asignar la tarea!');
            res.status(203).json({
                'ok': false,
                'msg': 'Fallo al asignar la tarea!'
            });
        });
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    registroUsuario,
    loginUsuario,
    addRoles,
    asignarTarea
}