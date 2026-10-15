// datosDePrueba.js
// Datos FALSOS que usan las pruebas. Así no dependemos de lo que haya
// guardado en el localStorage del navegador ni de los libros reales.

export const librosDePrueba = [
  { id: 1, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', stock: 3, disponibles: 2, portada: '', categoria: 'Novelas' },
  { id: 2, titulo: 'Fundamentos de Bases de Datos', autor: 'Elmasri', stock: 2, disponibles: 0, portada: '', categoria: 'Técnicos' },
  { id: 3, titulo: 'Clean Code', autor: 'Robert Martin', stock: 4, disponibles: 4, portada: '', categoria: 'Técnicos' },
];

export const administrador = { correo: 'mauricio@profesor.duoc.cl', nombre: 'Mauricio Machuca', tipo: 'ADMINISTRADOR' };
export const bibliotecario = { correo: 'biblioteca@duoc.cl', nombre: 'Encargado de Biblioteca', tipo: 'BIBLIOTECARIO' };
export const estudiante = { correo: 'ana@duoc.cl', nombre: 'Ana Pérez', tipo: 'ESTUDIANTE' };

export const usuariosDePrueba = [administrador, bibliotecario, estudiante];

export const prestamosDePrueba = [
  { id: 1, correo: 'ana@duoc.cl', libroId: 1, estado: 'ATRASADO' },
  { id: 2, correo: 'ana@duoc.cl', libroId: 3, estado: 'ACTIVO' },
];