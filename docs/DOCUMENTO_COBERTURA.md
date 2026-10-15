# Documento de cobertura de testing – Biblioteca Municipal

15 de octubre de 2026 · Silvia Valenzuela

## Datos de la evaluación

La Biblioteca Municipal cuenta con **32 pruebas unitarias escritas con Jasmine y ejecutadas con Karma**: las 32 aprueban y la cobertura llega a **100%** en sentencias, ramas, funciones y líneas. Este documento presenta la propuesta de pruebas y el análisis de sus resultados.

| Campo | Detalle |
| --- | --- |
| Asignatura | DSY1104 – Desarrollo Fullstack II |
| Evaluación | Evaluación Parcial N° 2 – Frontend y pruebas unitarias |
| Proyecto | Biblioteca Municipal en React |
| Estudiante | Silvia |
| Repositorio | [github.com/silviaximena/biblioteca-react](https://github.com/silviaximena/biblioteca-react) |

## Entorno de pruebas

Las pruebas se ejecutan en un navegador real (Chrome Headless) con un solo comando: `npm test`.

| Herramienta | Para qué se usa |
| --- | --- |
| Jasmine | Escribir las pruebas con `describe`, `it` y `expect`, y crear mocks con `jasmine.createSpy` |
| Karma | Ejecutar las pruebas en Chrome Headless |
| karma-webpack + Babel | Traducir el JSX de React para que el navegador lo entienda |
| React Testing Library | Dibujar componentes, buscar elementos y simular clics y escritura |
| MemoryRouter (React Router) | Dar a los componentes un router de prueba, porque usan `Link` y `useNavigate` |
| karma-coverage (Istanbul) | Medir la cobertura y generar el informe |

La configuración está en `karma.conf.js`, en la raíz del proyecto. Las pruebas están en la carpeta `test/` y los datos falsos que comparten, en `test/ayudantes/datosDePrueba.js`.

Para ejecutarlas:

```
npm install
npm test
```

El script `test` del `package.json` llama a `karma start karma.conf.js`. Al terminar, la terminal muestra el total de pruebas y una tabla de cobertura, y el informe visual queda en `coverage/html/index.html`.

## Estrategia de pruebas

Se probaron las partes con más lógica del proyecto: la fuente de datos (`datos.js`), la navegación según rol (`Navbar.js`), el panel de administración (`PanelAdmin.js`) y el botón para volver (`BotonVolver.js`). Cada prueba sigue el patrón **Preparar, Ejecutar, Comprobar**.

| Tipo de prueba | Qué verifica | Ejemplo en la biblioteca |
| --- | --- | --- |
| Lógica | Que las funciones devuelvan el resultado correcto | `eliminarLibro` quita solo el libro con ese id |
| Renderizado | Que el componente muestre los datos que recibe | El Resumen muestra 3 títulos, 6 disponibles y 1 agotado |
| Renderizado condicional | Que algo aparezca solo cuando corresponde | El estudiante no ve el Panel; el administrador sí |
| Props | Que el componente use las propiedades que recibe | El Navbar muestra el nombre y el rol del usuario |
| Estado | Que la pantalla cambie cuando cambia el estado | Al escribir en el formulario, el campo guarda el texto |
| Eventos | Que un clic o una escritura produzca la acción esperada | Al hacer clic en Eliminar, se llama a `eliminarLibro(1)` |

**Uso de mocks.** Los componentes reciben funciones desde `App.js` (`agregarLibro`, `editarLibro`, `eliminarLibro`, `setUsuario`, `setBusqueda`). En las pruebas se reemplazan por funciones falsas creadas con `jasmine.createSpy`. Un mock no ejecuta nada, pero registra si fue llamado y con qué datos, así cada componente se prueba solo, sin depender del resto de la aplicación.

**Datos de prueba.** Los libros y usuarios de las pruebas están en `test/ayudantes/datosDePrueba.js`. Así las pruebas no dependen de lo guardado en el localStorage del navegador y siempre dan el mismo resultado.

## Plan de pruebas

Las 32 pruebas aprobaron en Chrome Headless 155 sobre Windows 10.

| ID | Archivo | Caso de prueba | Tipo | Resultado esperado | Resultado |
| --- | --- | --- | --- | --- | --- |
| PU-01 | datos.spec.js | Crear un libro nuevo | Lógica | La lista pasa de 3 a 4 libros; el nuevo tiene id y disponibles igual al stock | Aprobada |
| PU-02 | datos.spec.js | Crear no modifica la lista original | Lógica | La lista original sigue con 3 libros | Aprobada |
| PU-03 | datos.spec.js | Leer un libro por id | Lógica | Encuentra Clean Code con id 3 o "3"; con id 99 devuelve undefined | Aprobada |
| PU-04 | datos.spec.js | Actualizar un libro | Lógica | Cambia solo `disponibles` del libro 2; el resto queda igual | Aprobada |
| PU-05 | datos.spec.js | Eliminar un libro | Lógica | Quedan 2 libros y el id 1 ya no está | Aprobada |
| PU-06 | datos.spec.js | Buscar por título o autor | Lógica | "clean" y "ELMASRI" encuentran 1 libro cada uno | Aprobada |
| PU-07 | datos.spec.js | Búsqueda vacía | Lógica | Devuelve los 3 libros | Aprobada |
| PU-08 | datos.spec.js | Filtrar por categoría | Lógica | "Técnicos" devuelve 2; sin categoría devuelve 3 | Aprobada |
| PU-09 | datos.spec.js | Guardar y leer en localStorage | Lógica | La lista leída es igual a la guardada | Aprobada |
| PU-10 | datos.spec.js | Leer sin datos guardados | Lógica | Devuelve el valor inicial | Aprobada |
| PU-11 | datos.spec.js | Leer datos dañados | Lógica | Devuelve el valor inicial sin romperse | Aprobada |
| PU-12 | Navbar.spec.js | Visitante sin sesión | Renderizado condicional | Ve "Ingresar"; no ve Panel ni Préstamos | Aprobada |
| PU-13 | Navbar.spec.js | Estudiante con sesión | Props / condicional | Ve su nombre y rol; no ve Panel ni Usuarios | Aprobada |
| PU-14 | Navbar.spec.js | Administrador con sesión | Renderizado condicional | Ve Usuarios, Préstamos, Reservas y Panel | Aprobada |
| PU-15 | Navbar.spec.js | Bibliotecario con sesión | Renderizado condicional | Ve el Panel | Aprobada |
| PU-16 | Navbar.spec.js | Escribir en el buscador | Evento / mock | Llama a `setBusqueda("Clean")` | Aprobada |
| PU-17 | Navbar.spec.js | Presionar Buscar | Evento | Navega a la página del catálogo | Aprobada |
| PU-18 | Navbar.spec.js | Presionar Salir | Evento / mock | Llama a `setUsuario(null)` | Aprobada |
| PU-19 | PanelAdmin.spec.js | Resumen del panel | Renderizado | Muestra 3 títulos, 6 disponibles y 1 agotado | Aprobada |
| PU-20 | PanelAdmin.spec.js | Abrir Gestión de libros | Estado / evento | Muestra la tabla con 3 filas y 1 libro agotado | Aprobada |
| PU-21 | PanelAdmin.spec.js | Permisos del bibliotecario | Renderizado condicional | No ve Usuarios, Agregar ni Eliminar | Aprobada |
| PU-22 | PanelAdmin.spec.js | Escribir en el formulario | Estado | El campo Título guarda "Rayuela" | Aprobada |
| PU-23 | PanelAdmin.spec.js | Enviar el formulario | Evento / mock | Llama a `agregarLibro` con los datos y el stock como número | Aprobada |
| PU-24 | PanelAdmin.spec.js | Editar un libro | Evento / mock | El formulario se llena y llama a `editarLibro(3, …)` | Aprobada |
| PU-25 | PanelAdmin.spec.js | Eliminar un libro | Evento / mock | Llama a `eliminarLibro(1)` | Aprobada |
| PU-26 | PanelAdmin.spec.js | Verificar usuario con atrasos | Estado / renderizado | Filtra por "ana" y la marca como Pendiente | Aprobada |
| PU-27 | PanelAdmin.spec.js | Módulo Usuarios | Estado / renderizado | El administrador ve la lista de 3 usuarios | Aprobada |
| PU-28 | PanelAdmin.spec.js | Portada de la tabla que no carga | Evento / DOM | La imagen cambia a la de respaldo | Aprobada |
| PU-29 | PanelAdmin.spec.js | Vista previa que no carga | Evento / DOM | La vista previa cambia a la imagen de respaldo | Aprobada |
| PU-30 | PanelAdmin.spec.js | Libro sin categoría ni portada | Renderizado condicional | Muestra "Sin asignar" y se puede editar | Aprobada |
| PU-31 | PanelAdmin.spec.js | Verificar usuario con reserva vigente | Estado / renderizado | Lo marca como Pendiente | Aprobada |
| PU-32 | BotonVolver.spec.js | Presionar Volver | Evento | Regresa a la página anterior | Aprobada |

## Resultados de cobertura

La cobertura llega a **100% en los cuatro indicadores** y en los cuatro archivos medidos.

| Archivo | Sentencias (%) | Ramas (%) | Funciones (%) | Líneas (%) |
| --- | --- | --- | --- | --- |
| data/datos.js | 100 | 100 | 100 | 100 |
| components/Navbar.js | 100 | 100 | 100 | 100 |
| components/PanelAdmin.js | 100 | 100 | 100 | 100 |
| components/BotonVolver.js | 100 | 100 | 100 | 100 |
| **Total** | **100** (108 de 108) | **100** (80 de 80) | **100** (46 de 46) | **100** (92 de 92) |

Cada indicador mide algo distinto: **sentencias** son las instrucciones ejecutadas; **ramas**, los caminos de cada `if` o condición; **funciones**, las funciones llamadas al menos una vez; y **líneas**, las líneas de código ejecutadas. El informe se generó con karma-coverage (Istanbul) y su versión visual está en `coverage/html/index.html`.

## Análisis de resultados

La meta fijada fue una cobertura de al menos **80%** en los cuatro indicadores. Se superó: todo el código medido quedó cubierto, incluidos los casos poco frecuentes.

**Cómo evolucionó.** La cobertura se usó como guía: después de cada ronda de pruebas, la columna de líneas sin cubrir mostró qué faltaba probar.

| Etapa | Pruebas | Sentencias | Qué se agregó |
| --- | --- | --- | --- |
| 1 | 1 | 13% de `datos.js` | Primera prueba: crear un libro |
| 2 | 18 | 100% de `datos.js` y `Navbar.js` | CRUD completo, búsqueda, localStorage y roles del Navbar |
| 3 | 27 | 95,32% total | Panel de administración: resumen, permisos y botones del CRUD |
| 4 | 32 | 100% total | Casos poco frecuentes detectados en el informe |

En la etapa 3, el informe marcó como no cubiertos cuatro casos, y se escribió una prueba para cada uno:

| Caso detectado | Prueba agregada |
| --- | --- |
| La imagen de respaldo cuando una portada no carga (`onError`) | Se simula el error con `fireEvent.error` y se comprueba que cambia la imagen |
| Un libro sin categoría ("Sin asignar") y sin portada | Se agrega un libro incompleto a los datos de prueba |
| Un usuario con una reserva vigente | Se pasan reservas falsas al panel y se comprueba que queda Pendiente |
| El botón Volver | Se arma un historial falso con `MemoryRouter` y se comprueba que regresa |

Estas pruebas no buscaban solo subir el número: cubren situaciones reales, como un enlace de portada que deja de funcionar o un libro ingresado con datos incompletos.

**Aporte de los mocks.** Gracias a `jasmine.createSpy` se comprobó no solo que los botones Agregar, Editar y Eliminar llaman a la función correcta, sino también con qué datos: por ejemplo, que el stock se envía como número y que se elimina el id 1.

## Mejoras y conclusión

El proceso de testeo cumple su objetivo: 32 de 32 pruebas aprobadas y 100% de cobertura, por sobre la meta de 80%.

**Próximas mejoras:**

1. Agregar pruebas para el Catálogo, el Login y el préstamo de libros (`pedirPrestamo` en `App.js`), que hoy no se prueban.
2. Ejecutar las pruebas también en Microsoft Edge, agregando su lanzador en `karma.conf.js`.
3. Ejecutar `npm test` automáticamente en GitHub cada vez que se suben cambios.

Escribir las pruebas ayudó a revisar el código con otros ojos: obligó a separar los datos en `datos.js`, a pensar en los permisos de cada rol y a dejar componentes que reciben sus funciones por props, lo que los hace más fáciles de probar y de reutilizar.