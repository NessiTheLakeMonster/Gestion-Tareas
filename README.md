# Proyecto de Gestion de Tareas

Proyecto realizado por Inés Mª Barrera Llerena para las asignaturas de `Diseño Web en Entorno Servidor` y `Diseño Web en Entorno Cliente`.

Tecnologías usadas para el desarrollo del proyecto:
* Node.js
* Angular 

# Ejecución del proyecto

## Para el backend

Para generar la carpeta `node_modules`

```bash
npm install
```

> [!IMPORTANT]
> Antes de migrar la base de datos se debe crear, se llamará `gestion_tareas_dev`

Migración de la base de datos:
```bash
npx sequelize-cli db:migrate
```

Seedear la base de datos anteriormente creada:
```bash
npx sequelize-cli db:seed:all
```

Para lanzar el servidor:
```bash
nodemon app/app
```

## Para el frontend

Para generar la carpeta `node_modules`

```bash
npm install
```

# Manual para el Administrador

### Rutas de la Gestión de Usuarios

#### Ver listado de usuarios

+ Ruta: `http://localhost:9090/api/usuarios/`
+ Verbo: `GET`

#### Buscar un usuario en la base de datos

+ Ruta: `http://localhost:9090/api/usuarios/{id}`
+ Verbo: `GET`
+ Parámetros:
  + `id`: identificador del usuario que se quieren obtener los datos

#### Registrar un nuevo usuario

+ Ruta: `http://localhost:9090/api/usuarios/`
+ Verbo: `POST`
+ JSON de ejemplo:
  + ```json
        {
            "nombre" : "fulanito",
            "apellido" : "fulanitez",
            "email" : "fulanito_fulanitez@gmail.com",
            "password" : "admin123"
        }
    ```

#### Login del usuario

+ Ruta: `http://localhost:9090/api/auth/login`
+ Verbo: `POST`
+ JSON de ejemplo
  + ```json
        {
            "email" : "fulanito_fulanitez@gmail.com",
            "password" : "admin123"
        }
    ```
+ Observaciones: el JSON de respuesta devolverá el `token`

#### Modificación de datos de un usuario

#### Borrado de un usuario

---

### Rutas de la Gestión de Tareas

#### Ver listado de tareas

+ Ruta: `http://localhost:9090/api/tareas/`
+ Verbo: `GET`

#### Buscar Tarea

#### Crear una nueva tarea

#### Asignar Tareas

+ Ruta: `http://localhost:9090/api/tareas/asignar/{idTarea}/{idUsuario}`
+ Verbo: `POST`