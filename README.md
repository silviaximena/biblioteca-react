# Biblioteca Municipal – React

Sistema web de préstamos y reservas de libros desarrollado en **React** y **React Bootstrap** para la Evaluación Parcial N° 2 de **DSY1104 – Desarrollo Fullstack II** (Duoc UC).

## Funcionalidades

- **Catálogo de libros** con búsqueda por título o autor y filtro por categoría.
- **Préstamos** de 15 días, con solicitud de devolución por parte del estudiante y confirmación del bibliotecario.
- **Reservas** de libros.
- **Registro e inicio de sesión** con tres roles:

| Rol | Qué puede hacer |
|---|---|
| Estudiante | Ver el catálogo, pedir préstamos, ver su perfil y solicitar devoluciones |
| Bibliotecario | Todo lo anterior + ver préstamos, reservas y usuarios, y confirmar devoluciones |
| Administrador | Todo lo anterior + agregar, editar y eliminar libros, y ver la lista de usuarios |

- **Panel de administración** con resumen, gestión de libros (CRUD con portadas), verificación de usuarios y lista de usuarios.
- **Rutas protegidas**: cada página revisa el rol del usuario antes de mostrarse.
- **Diseño responsivo** con React Bootstrap: en celular, el menú se convierte en un botón ☰ y el panel ordena su menú arriba.

## Tecnologías

| Herramienta | Uso |
|---|---|
| React 19 | Componentes, props, state y hooks |
| React Router | Navegación entre páginas y rutas protegidas |
| React Bootstrap / Bootstrap 5 | Navbar, Card, Table, Form, Button y sistema de grillas |
| localStorage | Persistencia de libros, usuarios, préstamos y reservas |
| Jasmine + Karma | Pruebas unitarias en el navegador |
| Istanbul (karma-coverage) | Informe de cobertura de código |

## Estructura del proyecto

```
biblioteca-react/
├── public/
├── src/
│   ├── components/      Componentes React (Navbar, Catalogo, PanelAdmin, Login, etc.)
│   ├── data/datos.js    Fuente de datos simulada con funciones CRUD
│   ├── App.js           Rutas y estado principal de la aplicación
│   └── App.css          Estilos personalizados
├── test/                Pruebas unitarias con Jasmine
│   └── ayudantes/       Datos falsos usados en las pruebas
└── karma.conf.js        Configuración de Karma
```

## Instalación

Requisitos: **Node.js 18 o superior** y **Google Chrome**.

```
git clone https://github.com/silviaximena/biblioteca-react.git
cd biblioteca-react
npm install
```

## Ejecutar la aplicación

```
npm start
```

Se abre en `http://localhost:3000`.

### Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | mauricio@profesor.duoc.cl | 1234 |
| Bibliotecario | biblioteca@duoc.cl | 1234 |

Para entrar como **estudiante**, crea una cuenta en "Crear cuenta" con un correo `@duoc.cl`.

## Ejecutar las pruebas

```
npm test
```

Karma abre Chrome sin ventana (Chrome Headless), ejecuta las pruebas de la carpeta `test/` y muestra el resultado con una tabla de cobertura. El informe visual queda en `coverage/html/index.html`.

**Resultado actual:** 32 pruebas aprobadas · 100% de cobertura.

| Sentencias | Ramas | Funciones | Líneas |
|---|---|---|---|
| 100% | 100% | 100% | 100% |

| Archivo de prueba | Qué prueba | Pruebas |
|---|---|---|
| `datos.spec.js` | CRUD de libros, búsqueda, filtro y localStorage | 11 |
| `Navbar.spec.js` | Opciones según el rol, buscador y cierre de sesión | 7 |
| `PanelAdmin.spec.js` | Resumen, permisos, formulario, botones del CRUD e imágenes de respaldo | 13 |
| `BotonVolver.spec.js` | Regreso a la página anterior | 1 |

Las pruebas verifican el renderizado, las props, el estado y los eventos de los componentes. Las funciones que los componentes reciben de `App.js` se reemplazan por **mocks** creados con `jasmine.createSpy`, para comprobar que se llaman con los datos correctos.

## Autores

   

   - **Silvia** – GitHub: [@silviaximena](https://github.com/silviaximena)
   - **Benjamín Alarcón** – GitHub: [@Benjaalarcon](https://github.com/Benjaalarcon)
   - **Johan** – GitHub: [@Johancg1](https://github.com/Johancg1)