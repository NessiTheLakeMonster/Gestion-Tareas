const genRolesAsignados = async (idUsuario) => {
    let rolesGen = []

    /* for (let i = 1; i <= cantidad; i++) { */
    let idRol = Math.floor(Math.random() * 2) + 1;

    let u =
    {
        id_rol: idRol,
        id_usuario: idUsuario,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    /*  rolesGen.push(u)
 } */
    /*  return Promise.all(rolesGen); */
    return u;
}

module.exports = {
    genRolesAsignados
}