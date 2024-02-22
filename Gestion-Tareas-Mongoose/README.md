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

### Ver usuarios registrados

- Ruta: `http://localhost:9090/api/usuarios`
- Verbo: `GET` 

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

### Asignar una tarea a un usuario

- Ruta: `http://localhost:9090/api/tareas/asignarTarea/{idUsuario}/{idTarea}`
- Verbo: `POST`