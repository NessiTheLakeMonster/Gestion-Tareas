const { faker, fakerES } = require('@faker-js/faker');

const genTareas = async (ctos = 1) => {
    let tareasGen = []
    let dificultad = ['baja', 'media', 'alta']

    for (let i = 1; i <= ctos; i++) {
        let u =
        {
            descripcion: fakerES.lorem.paragraph(),
            dificultad: dificultad[Math.floor(Math.random() * dificultad.length)],
            horas_previstas: 10 + Math.floor(Math.random() * 100),
            horas_realizadas: Math.floor(Math.random() * 80),
            realizacion: 0,
            completada: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        tareasGen.push(u)
    }
    return Promise.all(tareasGen);
}

module.exports = {
    genTareas
}