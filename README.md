# EncuentraU

**Sistema web para la gestión de objetos perdidos y encontrados en una comunidad universitaria.**

## 1. Descripción del proyecto

EncuentraU es una aplicación web desarrollada para facilitar la administración de objetos perdidos y encontrados dentro de una comunidad universitaria.

El sistema permite gestionar usuarios, categorías, ubicaciones, eventos y reportes de objetos. Su propósito es centralizar la información y facilitar el seguimiento de los objetos registrados.

El proyecto implementa autenticación de usuarios, control de acceso según roles y operaciones CRUD mediante una arquitectura MVC.

## 2. Objetivos

### Objetivo general

Desarrollar un sistema web para administrar reportes de objetos perdidos y encontrados en una comunidad universitaria, utilizando tecnologías frontend, backend y una base de datos relacional.

### Objetivos específicos

- Implementar un sistema de inicio de sesión con autenticación y autorización.
- Desarrollar módulos de administración para gestionar la información del sistema.
- Implementar operaciones de creación, consulta, actualización y eliminación de registros cuando corresponda.
- Conectar el frontend con el backend mediante una API REST.
- Organizar el backend utilizando el patrón de arquitectura MVC.
- Almacenar la información mediante PostgreSQL.

## 3. Tecnologías utilizadas

| Tecnología | Utilización |
|---|---|
| React | Desarrollo de la interfaz de usuario. |
| JavaScript | Lógica del frontend y backend. |
| CSS | Diseño y estilos de la aplicación. |
| Vite | Herramienta de desarrollo del frontend. |
| Node.js | Entorno de ejecución del backend. |
| Express | Desarrollo de la API REST. |
| PostgreSQL | Gestión de la base de datos. |
| bcryptjs | Hash de contraseñas. |
| JSON Web Token (JWT) | Autenticación y control de acceso. |
| pg | Conexión entre Node.js y PostgreSQL. |
| dotenv | Administración de variables de entorno. |
| CORS | Configuración de comunicación entre frontend y backend. |

## 4. Arquitectura MVC

El backend utiliza el patrón Modelo-Vista-Controlador (MVC), que permite organizar el código y separar las responsabilidades de cada componente.

- **Modelo (Model):** administra las consultas y operaciones realizadas sobre la base de datos.
- **Vista (View):** corresponde a la interfaz desarrollada con React, donde el usuario interactúa con el sistema.
- **Controlador (Controller):** contiene la lógica de las operaciones y procesa las solicitudes recibidas.
- **Rutas (Routes):** definen los endpoints que permiten acceder a las funcionalidades del backend.

### Flujo de funcionamiento

1. El usuario interactúa con la interfaz desarrollada en React.
2. El frontend envía una solicitud al backend.
3. Express recibe la solicitud mediante las rutas correspondientes.
4. El controlador ejecuta la lógica necesaria.
5. El modelo realiza las operaciones en PostgreSQL.
6. El backend devuelve una respuesta al frontend.

## 5. Módulos del sistema

### 5.1. Inicio de sesión

Permite ingresar al sistema mediante correo electrónico y contraseña.

Características:
- Validación de credenciales.
- Verificación de contraseñas mediante bcrypt.
- Generación de tokens JWT.
- Control de acceso según el rol del usuario.
- Protección de rutas privadas.

### 5.2. Administración de categorías

Permite administrar las categorías utilizadas para clasificar los objetos reportados.

Funcionalidades:
- Registrar categorías.
- Consultar categorías.
- Editar información.
- Activar y desactivar categorías.

### 5.3. Administración de ubicaciones

Permite gestionar los diferentes espacios de la universidad donde pueden perderse o encontrarse objetos.

Funcionalidades:
- Registrar ubicaciones.
- Consultar ubicaciones.
- Actualizar información.
- Desactivar ubicaciones.

### 5.4. Administración de eventos

Permite registrar y administrar eventos universitarios que pueden relacionarse con los reportes.

Funcionalidades:
- Registrar eventos.
- Consultar eventos.
- Editar información.
- Desactivar eventos.

### 5.5. Administración de usuarios

Permite gestionar las cuentas registradas en el sistema.

Funcionalidades:
- Registrar usuarios.
- Consultar usuarios.
- Editar información.
- Cambiar contraseñas.
- Asignar roles.
- Activar y desactivar usuarios.
- Eliminar usuarios cuando no tienen registros relacionados que impidan su eliminación.

### 5.6. Administración de reportes

Permite gestionar la información de los objetos perdidos y encontrados.

Cada reporte contiene información como:
- Usuario que registra el reporte.
- Categoría del objeto.
- Ubicación.
- Evento relacionado, cuando corresponda.
- Tipo de reporte: perdido o encontrado.
- Nombre del objeto.
- Descripción y características.
- Color.
- Fecha de ocurrencia.
- Estado del reporte.

Funcionalidades:
- Registrar reportes.
- Consultar reportes.
- Editar información.
- Actualizar el estado de los reportes.
- Consultar los reportes relacionados con el usuario autenticado.

## 6. Roles y seguridad

El sistema contempla dos tipos de roles:

**Administrador (ADMIN)**
- Acceso al panel de administración.
- Gestión de categorías, ubicaciones y eventos.
- Administración de usuarios.
- Gestión de reportes.

**Usuario (USUARIO)**
- Acceso mediante sus credenciales.
- Consulta de sus reportes y funcionalidades permitidas.
- Acceso restringido a las operaciones administrativas.

### Medidas de seguridad implementadas

- Contraseñas almacenadas mediante hash con bcrypt.
- Autenticación mediante JWT.
- Verificación de tokens en rutas protegidas.
- Middleware para validar permisos de administrador.
- Validación de campos obligatorios.
- Restricción de acceso a usuarios no autorizados.

## 7. Base de datos

El sistema utiliza PostgreSQL como gestor de base de datos.

La base de datos se denomina `encuentrau` y contiene las siguientes tablas principales:

| Tabla | Descripción |
|---|---|
| usuario | Almacena los datos y credenciales de los usuarios. |
| categoria | Contiene las categorías de los objetos. |
| ubicacion | Almacena los espacios de la universidad. |
| evento | Registra los eventos universitarios. |
| reporte | Contiene los reportes de objetos perdidos y encontrados. |
| historial_estado | Permite registrar información relacionada con los cambios de estado. |
| coincidencia | Almacena registros relacionados con coincidencias entre objetos. |
| entrega | Contiene información relacionada con las entregas de objetos. |

Las relaciones entre las tablas permiten mantener la integridad de la información mediante claves primarias y foráneas.

## 8. Estructura del proyecto

El proyecto está organizado en dos carpetas principales:

```text
EncuentraU/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 9. Endpoints principales de la API

La API utiliza el prefijo `/api`.

| Módulo | Método | Endpoint | Función |
|---|---|---|---|
| Autenticación | POST | `/auth/login` | Iniciar sesión. |
| Categorías | GET | `/categorias` | Consultar categorías. |
| Categorías | POST | `/categorias` | Crear categoría. |
| Categorías | PUT | `/categorias/:id` | Actualizar categoría. |
| Categorías | PATCH | `/categorias/:id/activar` | Activar categoría. |
| Categorías | PATCH | `/categorias/:id/desactivar` | Desactivar categoría. |
| Ubicaciones | GET | `/ubicaciones` | Consultar ubicaciones. |
| Ubicaciones | POST | `/ubicaciones` | Crear ubicación. |
| Ubicaciones | PUT | `/ubicaciones/:id` | Actualizar ubicación. |
| Ubicaciones | PATCH | `/ubicaciones/:id/desactivar` | Desactivar ubicación. |
| Eventos | GET | `/eventos` | Consultar eventos. |
| Eventos | POST | `/eventos` | Crear evento. |
| Eventos | PUT | `/eventos/:id` | Actualizar evento. |
| Eventos | PATCH | `/eventos/:id/desactivar` | Desactivar evento. |
| Usuarios | GET | `/usuarios` | Consultar usuarios. |
| Usuarios | POST | `/usuarios` | Crear usuario. |
| Usuarios | PUT | `/usuarios/:id` | Actualizar usuario. |
| Usuarios | PATCH | `/usuarios/:id/contrasena` | Cambiar contraseña. |
| Usuarios | PATCH | `/usuarios/:id/activar` | Activar usuario. |
| Usuarios | PATCH | `/usuarios/:id/desactivar` | Desactivar usuario. |
| Usuarios | DELETE | `/usuarios/:id` | Eliminar usuario. |
| Reportes | GET | `/reportes` | Consultar reportes. |
| Reportes | GET | `/reportes/mis-reportes` | Consultar reportes del usuario. |
| Reportes | POST | `/reportes` | Crear reporte. |
| Reportes | PUT | `/reportes/:id` | Actualizar reporte. |
| Reportes | PATCH | `/reportes/:id/estado` | Cambiar estado del reporte. |

## 10. Instalación y ejecución

### Requisitos previos

- Node.js.
- npm.
- PostgreSQL.
- Visual Studio Code (recomendado).

### Paso 1. Clonar el repositorio

```bash
git clone https://github.com/JoseJavierFragaV/EncuentraU.git
cd EncuentraU
```

### Paso 2. Configurar la base de datos

Crear la base de datos PostgreSQL con el nombre:

```sql
CREATE DATABASE encuentrau;
```

Ejecutar el script SQL del proyecto para crear las tablas y cargar los datos iniciales.

### Paso 3. Configurar el backend

Ingresar a la carpeta:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env` con la configuración de conexión a PostgreSQL y las variables necesarias para JWT.

Ejemplo de estructura:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=encuentrau
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD
JWT_SECRET=TU_CLAVE_SECRETA
JWT_EXPIRES_IN=1d
```

Iniciar el backend:

```bash
node app.js
```

El servidor estará disponible en:

`http://localhost:3000`

### Paso 4. Configurar el frontend

Abrir una segunda terminal e ingresar a:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm run dev
```

Abrir en el navegador la dirección que proporciona Vite, normalmente:

`http://localhost:5173`

## 11. Pruebas realizadas

Durante el desarrollo se realizaron pruebas para verificar el funcionamiento de los principales componentes del sistema.

- Inicio de sesión con credenciales válidas.
- Validación de contraseñas incorrectas.
- Validación de usuarios inexistentes.
- Restricción de acceso para usuarios desactivados.
- Validación de tokens inválidos.
- Restricción de funcionalidades administrativas para usuarios normales.
- Acceso a módulos protegidos con un administrador.
- Creación, consulta y actualización de categorías.
- Activación y desactivación de categorías.
- Gestión de ubicaciones y eventos.
- Creación y administración de usuarios.
- Validación de campos obligatorios.
- Creación, consulta y edición de reportes.
- Actualización de estados de reportes.
- Verificación de la comunicación entre React, Node.js y PostgreSQL.

## 12. Recursos del proyecto

**Repositorio de GitHub:**

https://github.com/JoseJavierFragaV/EncuentraU

**Video de demostración:**

https://youtu.be/3sUm5i4rAZ4

## 13. Autor

**José Fraga**

Proyecto académico desarrollado como aplicación web para la gestión de objetos perdidos y encontrados, aplicando React, Node.js, Express, PostgreSQL y arquitectura MVC.