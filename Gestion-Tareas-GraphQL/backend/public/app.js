async function enviarConsulta(query, variables = {}) {
    try {
        const response = await fetch('http://localhost:9080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al enviar la consulta GraphQL:', error);
        return { errors: [{ message: 'Error al enviar la consulta GraphQL' }] };
    }
}

async function obtenerUsuarios() {
    const query = `
        query {
            usuarios {
                id
                nombre
                apellido
                email
            }
        }
        `;

    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function obtenerTareas() {
    const query = `
        query {
            tareas {
                id
                descripcion
                dificultad
                horas_previstas
                horas_realizadas
                realizacion
                completada
            }
        }
        `;

    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function obtenerPersonaByID() {
    const id = prompt('Ingrese el ID de la persona:');
    const query = `
        query($id: ID!) {
            buscarUsuario(id: $id) {
                id
                nombre
                apellido
                email
            }
        }
    `;

    const variables = { id };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function registrarUsuario() {
    const nombre = prompt('Ingrese el nombre:');
    const apellido = prompt('Ingrese el apellido:');
    const email = prompt('Ingrese el email:');
    const password = prompt('Ingrese el password:');
    const query = `
        mutation($nombre: String!, $apellido: String!, $email: String!, $password: String!) {
            registrarUsuario(nombre: $nombre, apellido: $apellido, email: $email, password: $password) {
                id
                nombre
                apellido
                email
            }
        }
    `;
    const variables = { nombre, apellido, email, password };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function loginUsuario() {
    const email = prompt('Ingrese el email:');
    const password = prompt('Ingrese el password:');
    const query = `
        mutation($email: String!, $password: String!) {
            loginUsuario(email: $email, password: $password) {
                id
                nombre
                apellido
                email
            }
        }
    `;
    const variables = { email, password };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function modificarUsuario() {
    const id = prompt('Ingrese el ID del usuario a editar:');
    const nombre = prompt('Ingrese el nombre:');
    const apellido = prompt('Ingrese el apellido:');
    const email = prompt('Ingrese el email:');
    const password = prompt('Ingrese el password:');
    const query = `
        mutation($id: ID!, $nombre: String!, $apellido: String!, $email: String!, $password: String!) {
            modificarUsuario(id: $id, nombre: $nombre, apellido: $apellido, email: $email, password: $password) {
                id
                nombre
                apellido
                email
            }
        }
    `;
    const variables = { id, nombre, apellido, email, password };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function modificarTarea() {
    const id = prompt('Ingrese el ID de la tarea a editar:');
    const descripcion = prompt('Ingrese la descripcion:');
    const dificultad = prompt('Ingrese la dificultad:');
    const horas_previstas = parseInt(prompt('Ingrese las horas previstas:'), 10);
    const horas_realizadas = parseInt(prompt('Ingrese las horas realizadas:'), 10);
    const realizacion = parseInt(prompt('Ingrese la realizacion:'), 10);
    const completada = false;

    const query = `
        mutation($id: ID!, $descripcion: String!, $dificultad: String!, $horas_previstas: Int!, $horas_realizadas: Int!, $realizacion: Int!, $completada: Boolean!) {
            modificarTarea(id: $id, descripcion: $descripcion, dificultad: $dificultad, horas_previstas: $horas_previstas, horas_realizadas: $horas_realizadas, realizacion: $realizacion, completada: $completada) {
                id
                descripcion
                dificultad
                horas_previstas
                horas_realizadas
                realizacion
                completada
            }
        }
    `;
    const variables = { id, descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function eliminarUsuario() {
    const id = prompt('Ingrese el ID del usuario a eliminar:');
    const query = `
        mutation($id: ID!) {
            deleteUsuario(id: $id) {
                id
                nombre
                apellido
                email
            }
        }
    `;
    const variables = { id };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function verTareasUsuario() {
    const id = prompt('Ingrese el ID del usuario:');
    const query = `
        query($id: ID!) {
            verTareasUsuario(id: $id) {
                id
                id_usuario
                id_tarea
                tarea {
                    id
                    descripcion
                    dificultad
                    horas_previstas
                    horas_realizadas
                    realizacion
                    completada
                }
            }
        }
    `;
    const variables = { id };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function crearTarea() {
    const descripcion = prompt('Ingrese la descripcion:');
    const dificultad = prompt('Ingrese la dificultad:');
    const horas_previstas = parseInt(prompt('Ingrese las horas previstas:'), 10);
    const horas_realizadas = parseInt(prompt('Ingrese las horas realizadas:'), 10);
    const realizacion = parseInt(prompt('Ingrese la realizacion:'), 10);
    const completada = false;

    if (isNaN(horas_previstas) || isNaN(horas_realizadas) || isNaN(realizacion)) {
        console.error('One of the entered values is not a valid number.');
        return;
    }

    const query = `
        mutation($descripcion: String!, $dificultad: String!, $horas_previstas: Int!, $horas_realizadas: Int!, $realizacion: Int!, $completada: Boolean!) {
            crearTarea(descripcion: $descripcion, dificultad: $dificultad, horas_previstas: $horas_previstas, horas_realizadas: $horas_realizadas, realizacion: $realizacion, completada: $completada) {
                id
                descripcion
                dificultad
                horas_previstas
                horas_realizadas
                realizacion
                completada
            }
        }
    `;

    const variables = { descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function asignarTarea() {
    const id_usuario = prompt('Ingrese el ID del usuario:');
    const id_tarea = prompt('Ingrese el ID de la tarea:');
    const query = `
        mutation($id_usuario: ID!, $id_tarea: ID!) {
            asignarTarea(id_usuario: $id_usuario, id_tarea: $id_tarea) {
                id
                id_usuario
                id_tarea
            }
        }
    `;
    const variables = { id_usuario, id_tarea };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function marcarTareaCompletada() {
    const id = prompt('Ingrese el ID de la tarea:');
    const query = `
        mutation($id: ID!) {
            marcarTareaCompletada(id: $id) {
                id
                descripcion
                dificultad
                horas_previstas
                horas_realizadas
                realizacion
                completada
            }
        }
    `;
    const variables = { id };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function verTareasCompletadas() {
    const query = `
        query {
            verTareasCompletadas {
                id
                descripcion
                dificultad
                horas_previstas
                horas_realizadas
                realizacion
                completada
            }
        }
    `;
    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function verTareasPendientes() {
    const query = `
        query {
            verTareasPendientes {
                id
                descripcion
                dificultad
                horas_previstas
                horas_realizadas
                realizacion
                completada
            }
        }
    `;
    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function asignarAdmin() {
    const id_usuario = prompt('Ingrese el ID del usuario:');
    const query = `
        mutation($id_usuario: ID!) {
            asignarAdmin(id: $id_usuario) {
                id
                id_usuario
                users {
                    id
                    nombre
                    apellido
                    email
                }
                id_rol
            }
        }
    `;
    const variables = { id_usuario };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function verRolesUsuario() {
    const id_usuario = prompt('Ingrese el ID del usuario:');
    const query = `
        query($id_usuario: ID!) {
            verRolesUsuario(id: $id_usuario) {
                id
                id_usuario
                users {
                    id
                    nombre
                    apellido
                    email
                }
                id_rol
                roles {
                    id
                    nombre
                }
            }
        }
    `;
    const variables = { id_usuario };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function deleteTarea() {
    const id = prompt('Ingrese el ID de la tarea a eliminar:');
    const query = `
        mutation($id: ID!) {
            deleteTarea(id: $id) {
                id
                descripcion
                dificultad
                horas_previstas
                horas_realizadas
                realizacion
                completada
            }
        }
    `;
    const variables = { id };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

function mostrarResultado(data) {
    const resultadoDiv = document.getElementById('resultado');

    if (data.errors) {
        const formattedErrors = JSON.stringify(data.errors, null, 2)
            .replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;');
        resultadoDiv.innerHTML = `Error: <pre>${formattedErrors}</pre>`;
    } else {
        const formattedData = JSON.stringify(data.data, null, 2)
            .replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;');
        resultadoDiv.innerHTML = `<pre>${formattedData}</pre>`;
    }
}