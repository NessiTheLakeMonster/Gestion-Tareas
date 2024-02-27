const esAdmin = (req, res, next) => {
    if (req.user.rol === 'admin') {
        next();
    } else {
        res.status(403).send('No tienes permisos');
    }
}