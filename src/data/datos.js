// datos.js
// Fuente de datos simulada de la Biblioteca Municipal.
// Funciona como una pequeña "base de datos" guardada en localStorage
// y contiene las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

// Nombres de las llaves donde se guarda cada lista en localStorage
export const CLAVES = {
  libros: 'biblioteca_libros',
  usuarios: 'biblioteca_usuarios',
  prestamos: 'biblioteca_prestamos',
  reservas: 'biblioteca_reservas',
};

// ===== PERSISTENCIA (localStorage) =====

// LEER: obtiene una lista guardada. Si no existe o está dañada,
// devuelve el valor inicial que le pasemos.
export function leerDatos(clave, valorInicial = []) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  } catch (error) {
    return valorInicial;
  }
}

// GUARDAR: convierte la lista a texto JSON y la guarda en localStorage
export function guardarDatos(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista));
}

// ===== CRUD DE LIBROS =====
// Todas estas funciones NO modifican la lista original:
// devuelven una lista nueva, que es como React espera que se actualice el estado.

// CREAR: agrega un libro nuevo con un id único
export function crearLibro(lista, libro) {
  const nuevoLibro = {
    ...libro,
    id: Date.now(),                               // id único basado en la hora
    disponibles: libro.disponibles ?? libro.stock, // si no viene, parte igual al stock
  };
  return [...lista, nuevoLibro];
}

// LEER UNO: busca un libro por su id
export function obtenerLibroPorId(lista, id) {
  return lista.find((libro) => String(libro.id) === String(id));
}

// ACTUALIZAR: reemplaza solo los campos que cambiaron del libro con ese id
export function actualizarLibro(lista, id, cambios) {
  return lista.map((libro) =>
    String(libro.id) === String(id) ? { ...libro, ...cambios } : libro
  );
}

// ELIMINAR: devuelve la lista sin el libro con ese id
export function eliminarLibro(lista, id) {
  return lista.filter((libro) => String(libro.id) !== String(id));
}

// ===== FUNCIONES DE APOYO =====

// Busca libros por título o autor, sin importar mayúsculas
export function buscarLibros(lista, texto) {
  const t = texto.trim().toLowerCase();
  if (t === '') return lista;
  return lista.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(t) ||
      libro.autor.toLowerCase().includes(t)
  );
}

// Filtra los libros de una categoría (ej: "Novelas")
export function filtrarPorCategoria(lista, categoria) {
  if (!categoria) return lista;
  return lista.filter((libro) => libro.categoria === categoria);
}