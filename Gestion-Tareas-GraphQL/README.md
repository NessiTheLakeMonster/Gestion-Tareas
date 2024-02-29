# Ejercicio de Gestión de Tareas con GraphQL

Ejercicio realizado por Inés Mª Barrera Llerena para la signatura de Desarrollo Web en Entorno Servidor.

## Manual de uso

Primeramente se debe crear en PhpMyAdmin una base de datos llamada `gestion_tareas_dev` y luego ejecutar los
siguientes comandos en la terminal:

```bash	
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
## Manual para el uso de la API

> [!IMPORTANT]
> Todas las rutas de la API deben ser llamadas con el método ``POST``.
> 
> Todas las rutas seran `http://localhost:9080/graphql`

### Rutas para los usuarios

#### Crear un usuario

```graphql
    const query = 
            mutation($nombre: String!, $apellido: String!, $email: String!, $password: String!) {
                registrarUsuario(nombre: $nombre, apellido: $apellido, email: $email, password: $password) {
                    id
                    nombre
                    apellido
                    email
                }
            }
        ;
```

#### Iniciar sesión

```graphql
    const query = 
            mutation($email: String!, $password: String!) {
                loginUsuario(email: $email, password: $password) {
                    id
                    nombre
                    apellido
                    email
                }
            }
        ;
```

#### Listar usuarios

```graphql
    const query = 
            {
                usuarios {
                    id
                    nombre
                    apellido
                    email
                }
            }
        ;
```

#### Obtener un usuario

```graphql
    const query = 
            query($id: ID!) {
                buscarUsuario(id: $id) {
                    id
                    nombre
                    apellido
                    email
                }
            }
        ;
```

#### Actualizar un usuario

```graphql
    const query = 
        mutation($id: ID!, $nombre: String!, $apellido: String!, $email: String!, $password: String!) {
            modificarUsuario(id: $id, nombre: $nombre, apellido: $apellido, email: $email, password: $password) {
                id
                nombre
                apellido
                email
            }
        }
    ;
```

#### Eliminar un usuario

```graphql
    const query = 
        mutation($id: ID!) {
            deleteUsuario(id: $id) {
                id
                nombre
                apellido
                email
            }
        }
    ;
```

## Asignar Administrador a un Usuario

```graphql
    const query = 
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
    ;
```

#### Ver Roles de un Usuario

```graphql
    const query = 
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
    ;
```
---

### Rutas para las tareas

#### Listar tareas

```graphql
    const query = 
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
    ;
```

#### Crear una tarea

```graphql
    const query = 
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
    ;
```

#### Actualizar una tarea

```graphql
    const query = 
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
    ;
```

#### Eliminar una tarea

```graphql
    const query = 
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
    ;
```

#### Asignar tarea a un usuario

```graphql
    const query = 
        mutation($id_usuario: ID!, $id_tarea: ID!) {
            asignarTarea(id_usuario: $id_usuario, id_tarea: $id_tarea) {
                id
                id_usuario
                id_tarea
            }
        }
    ;
```

#### Ver tareas de un usuario

```graphql
    const query = 
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
    ;
```

#### Marcar tarea como completada

```graphql
    const query = 
        mutation($id: ID!) {
            marcarCompletada(id: $id) {
                id
                descripcion
                dificultad
                horas_previstas
                horas_realizadas
                realizacion
                completada
            }
        }
    ;
```

#### Ver tareas completadas

```graphql
    const query = 
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
    ;
```

#### Ver tareas no completadas

```graphql
    const query = 
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
    ;
```