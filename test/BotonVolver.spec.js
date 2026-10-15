// BotonVolver.spec.js
// Prueba que el botón "Volver" regrese a la página anterior.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BotonVolver from '../src/components/BotonVolver';

describe('BotonVolver', () => {
  afterEach(() => cleanup());

  it('al hacer clic, vuelve a la página anterior', () => {
    // Historial falso: primero el catálogo, ahora estamos en el panel
    render(
      <MemoryRouter initialEntries={['/catalogo', '/panel']} initialIndex={1}>
        <Routes>
          <Route path="/catalogo" element={<p>Página del catálogo</p>} />
          <Route path="/panel" element={<><p>Página del panel</p><BotonVolver /></>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Página del panel')).toBeTruthy();

    fireEvent.click(screen.getByText(/Volver/));

    expect(screen.getByText('Página del catálogo')).toBeTruthy();
  });
});