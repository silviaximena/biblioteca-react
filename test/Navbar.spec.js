// Navbar.spec.js
// Pruebas del componente de navegación: renderizado condicional según el rol,
// props (busqueda, setBusqueda, usuario, setUsuario) y eventos con mocks.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NavegacionBiblioteca from '../src/components/Navbar';
import { administrador, bibliotecario, estudiante } from './ayudantes/datosDePrueba';

// El Navbar usa Link y useNavigate, por eso se dibuja dentro de un Router de prueba
// (MemoryRouter: un router que vive en memoria, sin cambiar la URL del navegador)
function dibujarNavbar(props) {
  const propsCompletas = {
    busqueda: '',
    setBusqueda: jasmine.createSpy('setBusqueda'), // MOCK de la función de App.js
    usuario: null,
    setUsuario: jasmine.createSpy('setUsuario'),   // MOCK de la función de App.js
    ...props, // lo que mande cada prueba reemplaza a los valores de arriba
  };
  render(
    <MemoryRouter>
      <NavegacionBiblioteca {...propsCompletas} />
      {/* Páginas falsas para comprobar a dónde nos lleva el buscador */}
      <Routes>
        <Route path="/" element={<p>Página de inicio</p>} />
        <Route path="/catalogo" element={<p>Página del catálogo</p>} />
      </Routes>
    </MemoryRouter>
  );
  return propsCompletas;
}

describe('Navbar', () => {
  // Después de cada prueba, borra lo dibujado para que no se mezclen
  afterEach(() => cleanup());

  it('un visitante sin sesión ve "Ingresar" y NO ve el Panel', () => {
    dibujarNavbar({ usuario: null });

    expect(screen.getByText('Ingresar')).toBeTruthy();
    // queryByText devuelve null si NO encuentra el texto (getByText daría error)
    expect(screen.queryByText('Panel')).toBeNull();
    expect(screen.queryByText('Préstamos')).toBeNull();
  });

  it('un estudiante ve su nombre y rol, pero NO las opciones de administración', () => {
    dibujarNavbar({ usuario: estudiante });

    expect(screen.getByText('Ana Pérez')).toBeTruthy();
    expect(screen.getByText('(ESTUDIANTE)')).toBeTruthy();
    expect(screen.queryByText('Panel')).toBeNull();
    expect(screen.queryByText('Usuarios')).toBeNull();
  });

  it('el administrador ve Usuarios, Préstamos, Reservas y Panel', () => {
    dibujarNavbar({ usuario: administrador });

    ['Usuarios', 'Préstamos', 'Reservas', 'Panel'].forEach((texto) => {
      expect(screen.getByText(texto)).toBeTruthy();
    });
    expect(screen.getByText('Panel').getAttribute('href')).toBe('/panel');
  });

  it('el bibliotecario también puede ver el Panel', () => {
    dibujarNavbar({ usuario: bibliotecario });
    expect(screen.getByText('Panel')).toBeTruthy();
  });

  it('al escribir en el buscador, llama a setBusqueda con el texto', () => {
    const props = dibujarNavbar({});

    fireEvent.change(screen.getByLabelText('Buscar libros o autores'), { target: { value: 'Clean' } });

    // El mock "recuerda" con qué valor lo llamaron
    expect(props.setBusqueda).toHaveBeenCalledWith('Clean');
  });

  it('al buscar, navega a la página del catálogo', () => {
    dibujarNavbar({ busqueda: 'Clean' });
    expect(screen.getByText('Página de inicio')).toBeTruthy();

    fireEvent.click(screen.getByText('Buscar'));

    expect(screen.getByText('Página del catálogo')).toBeTruthy();
  });

  it('al hacer clic en "Salir", cierra la sesión llamando a setUsuario(null)', () => {
    const props = dibujarNavbar({ usuario: administrador });

    fireEvent.click(screen.getByText('Salir'));

    expect(props.setUsuario).toHaveBeenCalledWith(null);
  });
});