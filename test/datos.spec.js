// datos.spec.js
// Pruebas de la fuente de datos simulada (src/data/datos.js):
// operaciones CRUD de libros, búsqueda, filtro y persistencia en localStorage.
import {
  leerDatos,
  guardarDatos,
  crearLibro,
  obtenerLibroPorId,
  actualizarLibro,
  eliminarLibro,
  buscarLibros,
  filtrarPorCategoria,
} from '../src/data/datos';
import { librosDePrueba } from './ayudantes/datosDePrueba';

describe('datos.js – CRUD de libros', () => {
  it('CREAR: agrega un libro nuevo con id y disponibles igual al stock', () => {
    // PREPARAR + EJECUTAR
    const resultado = crearLibro(librosDePrueba, { titulo: 'Rayuela', autor: 'Julio Cortázar', stock: 5 });

    // COMPROBAR: tenía 3 libros, ahora 4, y el nuevo tiene sus datos
    expect(resultado.length).toBe(4);
    const nuevo = resultado[3];
    expect(nuevo.titulo).toBe('Rayuela');
    expect(nuevo.id).toBeDefined();
    expect(nuevo.disponibles).toBe(5);
  });

  it('CREAR: no modifica la lista original (inmutabilidad)', () => {
    crearLibro(librosDePrueba, { titulo: 'Rayuela', autor: 'Julio Cortázar', stock: 5 });
    // React necesita listas nuevas para actualizar la pantalla
    expect(librosDePrueba.length).toBe(3);
  });

  it('LEER: encuentra un libro por su id, aunque el id venga como texto', () => {
    expect(obtenerLibroPorId(librosDePrueba, 3).titulo).toBe('Clean Code');
    expect(obtenerLibroPorId(librosDePrueba, '3').titulo).toBe('Clean Code');
    expect(obtenerLibroPorId(librosDePrueba, 99)).toBeUndefined();
  });

  it('ACTUALIZAR: cambia solo los campos indicados del libro elegido', () => {
    const resultado = actualizarLibro(librosDePrueba, 2, { disponibles: 1 });

    expect(resultado[1].disponibles).toBe(1);
    expect(resultado[1].titulo).toBe('Fundamentos de Bases de Datos'); // lo demás no cambia
    expect(resultado[0]).toBe(librosDePrueba[0]); // los otros libros quedan igual
  });

  it('ELIMINAR: quita solo el libro con ese id', () => {
    const resultado = eliminarLibro(librosDePrueba, 1);

    expect(resultado.length).toBe(2);
    expect(obtenerLibroPorId(resultado, 1)).toBeUndefined(); // el id 1 ya no está
  });
});

describe('datos.js – búsqueda y filtro', () => {
  it('busca por título o autor sin importar mayúsculas', () => {
    expect(buscarLibros(librosDePrueba, 'clean').length).toBe(1);
    expect(buscarLibros(librosDePrueba, 'ELMASRI').length).toBe(1);
  });

  it('si la búsqueda está vacía, devuelve todos los libros', () => {
    expect(buscarLibros(librosDePrueba, '   ').length).toBe(3);
  });

  it('filtra por categoría y sin categoría devuelve todos', () => {
    expect(filtrarPorCategoria(librosDePrueba, 'Técnicos').length).toBe(2);
    expect(filtrarPorCategoria(librosDePrueba, '').length).toBe(3);
  });
});

describe('datos.js – persistencia en localStorage', () => {
  const CLAVE = 'prueba_libros';

  // Se ejecuta después de CADA prueba: deja el navegador limpio
  afterEach(() => localStorage.removeItem(CLAVE));

  it('guarda una lista y la vuelve a leer igual', () => {
    guardarDatos(CLAVE, librosDePrueba);
    expect(leerDatos(CLAVE)).toEqual(librosDePrueba);
  });

  it('devuelve el valor inicial si no hay nada guardado', () => {
    expect(leerDatos(CLAVE, ['inicial'])).toEqual(['inicial']);
  });

  it('devuelve el valor inicial si lo guardado está dañado', () => {
    localStorage.setItem(CLAVE, '{esto no es JSON');
    expect(leerDatos(CLAVE, [])).toEqual([]);
  });
});