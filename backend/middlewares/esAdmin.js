const esAdmin = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const {rol} = req.usuario;

    if (rol !== 'ADMIN') {
        return res.status(401).json({
            ok: false,
            msg: 'El usuario no es administrador'
        });
    }

    next();
}