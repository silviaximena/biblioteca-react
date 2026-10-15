// PanelAdmin.spec.js
// Pruebas del panel de administración: renderizado de datos, cambio de módulo
// (estado), permisos según rol y eventos del CRUD usando mocks (jasmine.createSpy).
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PanelAdmin from '../src/components/PanelAdmin';
import {
  librosDePrueba,
  usuariosDePrueba,
  prestamosDePrueba,
  administrador,
  bibliotecario,
} from './ayudantes/datosDePrueba';

// Dibuja el Panel con datos falsos. El Router es necesario porque el Panel
// usa el componente BotonVolver, que navega hacia atrás.
function dibujarPanel(usuario = administrador) {
  const props = {
    usuario,
    libros: librosDePrueba,
    usuarios: usuariosDePrueba,
    prestamos: prestamosDePrueba,
    reservas: [],
    // MOCKS: reemplazan las funciones reales de App.js para comprobar si se llaman
    agregarLibro: jasmine.createSpy('agregarLibro'),
    editarLibro: jasmine.createSpy('editarLibro'),
    eliminarLibro: jasmine.createSpy('eliminarLibro'),
  };
  render(
    <MemoryRouter>
      <PanelAdmin {...props} />
    </MemoryRouter>
  );
  return props;
}

// Ayudante: escribe en el campo que tiene ese placeholder
function escribir(placeholder, valor) {
  fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value: valor } });
}

describe('PanelAdmin', () => {
  afterEach(() => cleanup());

  it('el Resumen calcula títulos totales, ejemplares disponibles y agotados', () => {
    dibujarPanel();

    expect(screen.getByText('Panel Admin')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy(); // 3 títulos
    expect(screen.getByText('6')).toBeTruthy(); // 2 + 0 + 4 ejemplares disponibles
    expect(screen.getByText('1')).toBeTruthy(); // 1 título agotado
  });

  it('al hacer clic en "Gestión de libros", cambia de módulo y muestra la tabla', () => {
    dibujarPanel();

    fireEvent.click(screen.getByText('Gestión de libros'));

    expect(screen.getByText('Clean Code')).toBeTruthy();
    expect(document.querySelectorAll('tbody tr').length).toBe(3); // una fila por libro
    expect(screen.getAllByText('Agotado').length).toBe(1);
  });

  it('el bibliotecario NO ve el módulo Usuarios ni puede agregar o eliminar libros', () => {
    dibujarPanel(bibliotecario);

    expect(screen.getByText('Panel Bibliotecario')).toBeTruthy();
    expect(screen.queryByText('Usuarios')).toBeNull();

    fireEvent.click(screen.getByText('Gestión de libros'));
    expect(screen.queryByText('+ Agregar libro')).toBeNull();
    expect(screen.queryByText('Eliminar')).toBeNull();
  });

  it('el formulario guarda en el estado lo que se escribe', () => {
    dibujarPanel();
    fireEvent.click(screen.getByText('Gestión de libros'));
    fireEvent.click(screen.getByText('+ Agregar libro'));

    escribir('Título', 'Rayuela');

    expect(screen.getByPlaceholderText('Título').value).toBe('Rayuela');
  });

  it('al enviar el formulario, llama a agregarLibro con los datos ingresados', () => {
    const props = dibujarPanel();
    fireEvent.click(screen.getByText('Gestión de libros'));
    fireEvent.click(screen.getByText('+ Agregar libro'));

    escribir('Título', 'Rayuela');
    escribir('Autor', 'Julio Cortázar');
    escribir('Stock', '5');
    escribir('Disponibles', '5');
    fireEvent.click(screen.getByText('Agregar'));

    expect(props.agregarLibro).toHaveBeenCalledTimes(1);
    // Revisamos qué datos recibió el mock
    const libroEnviado = props.agregarLibro.calls.mostRecent().args[0];
    expect(libroEnviado.titulo).toBe('Rayuela');
    expect(libroEnviado.stock).toBe(5); // se convierte de texto a número
    expect(screen.queryByPlaceholderText('Título')).toBeNull(); // el formulario se cierra
  });

  it('al editar un libro, el formulario se llena y llama a editarLibro con su id', () => {
    const props = dibujarPanel();
    fireEvent.click(screen.getByText('Gestión de libros'));

    fireEvent.click(screen.getAllByText('Editar')[2]); // tercer libro: Clean Code (id 3)
    expect(screen.getByPlaceholderText('Título').value).toBe('Clean Code');

    escribir('Disponibles', '2');
    fireEvent.click(screen.getByText('Guardar cambios'));

    expect(props.editarLibro).toHaveBeenCalledWith(3, jasmine.objectContaining({ disponibles: 2 }));
  });

  it('al hacer clic en "Eliminar", llama a eliminarLibro con el id correcto', () => {
    const props = dibujarPanel();
    fireEvent.click(screen.getByText('Gestión de libros'));

    fireEvent.click(screen.getAllByText('Eliminar')[0]); // primer libro: Cien Años (id 1)

    expect(props.eliminarLibro).toHaveBeenCalledWith(1);
  });

  it('"Verificar usuario" filtra por nombre y marca como Pendiente a quien tiene atrasos', () => {
    dibujarPanel();
    fireEvent.click(screen.getByText('Verificar usuario'));

    fireEvent.change(screen.getByPlaceholderText('Buscar por nombre o correo...'), { target: { value: 'ana' } });

    expect(document.querySelectorAll('tbody tr').length).toBe(1);
    expect(screen.getByText('Ana Pérez')).toBeTruthy();
    expect(screen.getByText('Pendiente')).toBeTruthy();
  });
    it('el administrador ve la lista de usuarios registrados', () => {
    dibujarPanel();

    fireEvent.click(screen.getByText('Usuarios'));

    expect(screen.getByText('Usuarios registrados')).toBeTruthy();
    expect(document.querySelectorAll('tbody tr').length).toBe(3); // los 3 usuarios de prueba
  });
});