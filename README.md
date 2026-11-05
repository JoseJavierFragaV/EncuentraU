# EncuentraU – Sistema Web de Objetos Perdidos y Encontrados

## Descripción del proyecto

**EncuentraU** es una aplicación web desarrollada para facilitar la gestión de objetos perdidos y encontrados dentro de un entorno universitario. Su objetivo es centralizar la información y permitir administrar los diferentes registros mediante una interfaz sencilla e intuitiva.

El sistema permite gestionar usuarios, categorías, ubicaciones, eventos y reportes, incorporando autenticación y control de acceso para proteger las funcionalidades administrativas.

## Enlaces del proyecto

| Recurso | Enlace |
|---|---|
| Aplicación web | https://encuentra-u.vercel.app |
| Backend / API | https://encuentrau-w6un.onrender.com |
| Video de presentación | https://youtu.be/R2qpEWcxmOc |
| Repositorio GitHub | https://github.com/JoseJavierFragaV/EncuentraU |

## Tecnologías utilizadas

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express
- JavaScript
- API REST

### Base de datos
- PostgreSQL
- Neon

### Seguridad
- bcryptjs para el cifrado mediante hash de contraseñas.
- JSON Web Tokens (JWT) para la autenticación.
- Middleware para proteger rutas y controlar el acceso a las funcionalidades privadas.

### Servicios de despliegue
- Vercel: despliegue del frontend.
- Render: despliegue del backend.
- Neon: alojamiento de la base de datos PostgreSQL.

## Arquitectura del proyecto

El backend utiliza el patrón de arquitectura **MVC (Modelo-Vista-Controlador)**, que permite separar las responsabilidades y organizar el código.

- **Modelo:** gestiona los datos y las operaciones relacionadas con PostgreSQL.
- **Vista:** corresponde a la interfaz desarrollada con React.
- **Controlador:** procesa las solicitudes y ejecuta la lógica correspondiente.
- **Rutas:** organizan los endpoints y dirigen las solicitudes hacia los controladores.

Esta estructura facilita el mantenimiento y la organización de la aplicación.

## Funcionalidades principales

El sistema cuenta con las siguientes funcionalidades:

1. **Inicio de sesión:** permite ingresar mediante credenciales registradas.
2. **Autenticación:** valida las credenciales y utiliza tokens JWT.
3. **Protección de rutas:** restringe el acceso a las funcionalidades administrativas cuando no existe una sesión autenticada.
4. **Gestión de categorías:** permite crear, consultar, actualizar y eliminar o desactivar registros.
5. **Gestión de ubicaciones:** permite administrar los lugares registrados.
6. **Gestión de eventos:** permite administrar la información de los eventos.
7. **Gestión de usuarios:** permite administrar los usuarios del sistema.
8. **Gestión de reportes:** permite consultar y administrar los reportes registrados.

## Operaciones CRUD

Los módulos administrativos implementan las operaciones CRUD:

| Operación | Descripción |
|---|---|
| Create | Crear nuevos registros. |
| Read | Consultar y visualizar registros. |
| Update | Modificar información existente. |
| Delete | Eliminar o desactivar registros, según el módulo. |

## Estructura general

El proyecto se encuentra organizado en dos componentes principales:

- **frontend:** contiene la aplicación React, sus componentes, páginas, estilos y servicios de conexión con el backend.
- **backend:** contiene el servidor Node.js, las rutas, controladores, modelos, configuración de la base de datos y mecanismos de autenticación.

También se incluye la carpeta de base de datos con los archivos correspondientes al esquema del proyecto.

## Instalación y ejecución local

### Requisitos previos

- Node.js
- PostgreSQL
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/JoseJavierFragaV/EncuentraU.git
cd EncuentraU
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Configurar las variables de entorno necesarias en un archivo `.env`, utilizando las credenciales de la base de datos y una clave JWT propia.

Ejemplo de las variables requeridas:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=encuentrau
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_SSL=false
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1d
```

Ejecutar el backend:

```bash
node app.js
```

### 3. Configurar el frontend

Desde otra terminal:

```bash
cd frontend
npm install
```

Crear el archivo `.env` con la dirección del backend:

```env
VITE_API_URL=http://localhost:3000/api
```

Ejecutar el frontend:

```bash
npm run dev
```

La aplicación estará disponible en la dirección local indicada por Vite, normalmente:

```text
http://localhost:5173
```

## Despliegue

La aplicación se encuentra desplegada y disponible públicamente.

- **Frontend:** Vercel.
- **Backend:** Render.
- **Base de datos:** Neon PostgreSQL.

La conexión entre estos servicios permite utilizar la aplicación desde internet sin necesidad de ejecutar los componentes localmente.

## Autor

**José Javier Fraga**

Proyecto académico desarrollado como parte de la asignatura de desarrollo web, aplicando los conocimientos de arquitectura MVC, operaciones CRUD, autenticación, conexión a bases de datos y despliegue de aplicaciones web.

## Video de demostración

En el siguiente enlace se presenta el funcionamiento general de EncuentraU, incluyendo el inicio de sesión, los módulos administrativos, las operaciones CRUD, la seguridad y el despliegue del sistema.

[Ver video de presentación de EncuentraU](https://youtu.be/R2qpEWcxmOc)