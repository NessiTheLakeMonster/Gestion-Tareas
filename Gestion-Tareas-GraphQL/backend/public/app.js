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