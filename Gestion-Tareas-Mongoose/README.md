# Proyecto de tareas realizado con Mongoose

# Manual del administrador

## Rutas para los usuarios

### Registrar un usuario

- Ruta: `http://localhost:9090/api/usuarios/`
- Verbos: `POST`
- JSON de ejemplo: 
    ```json
    {
        "nombre": "InesM",
        "apellido": "Llerena",
        "email": "inesines5@gmail.com",
        "password": "admin123"
    }
    ```

### Logear al usuario

- Ruta: `http://localhost:9090/api/usuarios/login`
- Verbos: `POST`
- JSON de ejemplo: 
    ```json
    {
        "email" : "inesines3@gmail.com",
        "password" : "admin123"
    }
    ```

### Ver un usuario por su id

- Ruta: `http://localhost:9090/api/usuarios/{idUsuario}`
- Verbo: `GET`

### Ver usuarios registrados

- Ruta: `http://localhost:9090/api/usuarios`
- Verbo: `GET` 

### Borra un usuario

- Ruta: `http://localhost:9090/api/usuarios/{idUsuario}`
- Verbo: `DELETE`

### Añadir un nuevo rol a un usuario

- Ruta: `http://localhost:9090/api/usuarios/addRol/{idUsuario}`
- Verbo: `POST`
- JSON de ejemplo: 
    ```json
    {
        "rol": ["admin"]
    }
    ```

## Rutas para las tareas

### Ver todas las tareas

- Ruta: `http://localhost:9090/api/tareas`
- Verbo: `GET`

### Ver una tarea por su id

- Ruta: `http://localhost:9090/api/tareas/{id}`
- Verbo: `GET`

### Crear una tarea

- Ruta: `http://localhost:9090/api/tareas/`
- Verbo: `POST`
- JSON de ejemplo:
  ```json
    {
        "descripcion": "prueba",
        "dificultad": "media",
        "horas_previstas": 12,
        "horas_realizadas": 2,
        "realizacion": 0.02,
        "completada": false
    }
  ```

### Modificar una tarea

- Ruta: `http://localhost:9090/api/tareas/{id}`
- Verbo: `PUT`
- JSON de ejemplo:
  ```json
    {
        "descripcion": "prueba",
        "dificultad": "media",
        "horas_previstas": 12,
        "horas_realizadas": 2,
        "realizacion": 0.02,
        "completada": false
    }
  ```

### Borrar una tarea

- Ruta: `http://localhost:9090/api/tareas/{idTarea}`
- Verbo: `DELETE`

### Marcar una tarea como completada

- Ruta: `http://localhost:9090/api/tareas/completada/{idTarea}`
- Verbo: `PUT`

### Asignar una tarea a un usuario

- Ruta: `http://localhost:9090/api/tareas/asignarTarea/{idUsuario}/{idTarea}`
- Verbo: `POST`

### Ver las tareas asignadas a un usuario

- Ruta: `http://localhost:9090/api/misTareas/{idUsuario}`
- Verbo: `GET`

### Ver ranking de tareas completadas

- Ruta: `http://localhost:9090/api/tareas/ranking`
- Verbo: `GET`

### Ver tareas completadas de un usuario

- Ruta: `http://localhost:9090/api/tareasCompletadas/{idUsuario}`
- Verbo: `GET`

### Ver tareas no completadas de un usuario

- Ruta: `http://localhost:9090/api/tareasPendientes/{idUsuario}`
- Verbo: `GET`