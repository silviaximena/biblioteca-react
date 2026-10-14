import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

// Barra de navegación de la biblioteca.
// Usa el Navbar de React Bootstrap: en pantallas grandes muestra los links en fila
// y en celular los esconde en un botón ☰ (Navbar.Toggle + Navbar.Collapse).
const NavegacionBiblioteca = ({ busqueda, setBusqueda, usuario, setUsuario }) => {
  const navigate = useNavigate();

  // STATE: indica si el menú ☰ está abierto en celular
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cierra el menú después de elegir una opción (solo se nota en celular)
  const cerrarMenu = () => setMenuAbierto(false);

  // Al buscar, se cierra el menú y se va al catálogo con el texto escrito
  const handleBuscar = (e) => {
    e.preventDefault(); // evita que el formulario recargue la página
    cerrarMenu();
    navigate('/catalogo');
  };

  const cerrarSesion = () => {
    setUsuario(null);
    cerrarMenu();
    navigate('/');
  };

  // Solo administradores y bibliotecarios ven Usuarios, Préstamos, Reservas y Panel
  const puedeVerPanel = usuario && (usuario.tipo === 'ADMINISTRADOR' || usuario.tipo === 'BIBLIOTECARIO');

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="navbar-biblioteca"
      expanded={menuAbierto}
      onToggle={setMenuAbierto}
    >
      <Container fluid className="px-3 px-md-4">
        <Navbar.Brand as={Link} to="/" onClick={cerrarMenu} className="marca-biblioteca">
          Biblioteca Municipal
        </Navbar.Brand>

        {/* Botón ☰: solo aparece en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="menu-biblioteca" aria-label="Abrir menú de navegación" />

        <Navbar.Collapse id="menu-biblioteca">
          {/* ms-auto empuja los links a la derecha en pantallas grandes */}
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} to="/" onClick={cerrarMenu}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo" onClick={cerrarMenu}>Catálogo</Nav.Link>

            {/* Renderizado condicional según el rol del usuario */}
            {puedeVerPanel && (
              <>
                <Nav.Link as={Link} to="/usuarios" onClick={cerrarMenu}>Usuarios</Nav.Link>
                <Nav.Link as={Link} to="/prestamos" onClick={cerrarMenu}>Préstamos</Nav.Link>
                <Nav.Link as={Link} to="/reservas" onClick={cerrarMenu}>Reservas</Nav.Link>
                <Nav.Link as={Link} to="/panel" onClick={cerrarMenu} className="enlace-panel">Panel</Nav.Link>
              </>
            )}

            {usuario ? (
              <>
                <Nav.Link as={Link} to="/perfil" onClick={cerrarMenu} className="enlace-usuario">
                  {usuario.nombre} <span className="rol-usuario">({usuario.tipo})</span>
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="boton-salir mt-2 mt-lg-0 align-self-start align-self-lg-center"
                  onClick={cerrarSesion}
                >
                  Salir
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" onClick={cerrarMenu} className="enlace-ingresar">
                Ingresar
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

        {/* Buscador: siempre visible, ocupa todo el ancho debajo del menú */}
        <Form className="buscador-navbar d-flex gap-2 w-100 mt-2" role="search" onSubmit={handleBuscar}>
          <Form.Control
            type="search"
            placeholder="Buscar libros, autores..."
            aria-label="Buscar libros o autores"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="rounded-pill"
          />
          <Button type="submit" className="btn-amarillo rounded-pill px-4">
            Buscar
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavegacionBiblioteca;