import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuienesSomos from './components/QuienesSomos';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import Usuarios from './components/Usuarios';
import Prestamos from './components/Prestamos';
import Reservas from './components/Reservas';
import Login from './components/Login';
import CrearCuenta from './components/CrearCuenta';
import PanelAdmin from './components/PanelAdmin';
import Perfil from './components/Perfil';
import Ayuda from './components/Ayuda';
import Horarios from './components/Horarios';
import DetalleActividad from './components/DetalleActividad';
import RutaProtegida from './components/RutaProtegida';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';

const librosIniciales = [
  { id: 1, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', stock: 3, disponibles: 2, portada: '', categoria: 'Novelas' },
  { id: 2, titulo: 'Fundamentos de Bases de Datos', autor: 'Elmasri', stock: 2, disponibles: 0, portada: '', categoria: 'Técnicos' },
  { id: 3, titulo: 'Clean Code', autor: 'Robert Martin', stock: 4, disponibles: 4, portada: '', categoria: 'Técnicos' },
  { id: 4, titulo: 'PL/SQL para Principiantes', autor: 'Oracle Press', stock: 1, disponibles: 1, portada: '', categoria: 'Técnicos' },
];

const usuariosIniciales = [
  { correo: 'biblioteca@duoc.cl', clave: '1234', nombre: 'Encargado de Biblioteca', tipo: 'BIBLIOTECARIO', fechaNacimiento: '' },
  { correo: 'mauricio@profesor.duoc.cl', clave: '1234', nombre: 'Mauricio Machuca', tipo: 'ADMINISTRADOR', fechaNacimiento: '' },
];

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [usuario, setUsuario] = useState(null);

  const [libros, setLibros] = useState(() => {
    const guardado = localStorage.getItem('biblioteca_libros');
    return guardado ? JSON.parse(guardado) : librosIniciales;
  });

  const [usuarios, setUsuarios] = useState(() => {
    const guardado = localStorage.getItem('biblioteca_usuarios');
    return guardado ? JSON.parse(guardado) : usuariosIniciales;
  });

  const [prestamos, setPrestamos] = useState(() => {
    const guardado = localStorage.getItem('biblioteca_prestamos');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [reservas] = useState(() => {
    const guardado = localStorage.getItem('biblioteca_reservas');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('biblioteca_libros', JSON.stringify(libros));
  }, [libros]);

  useEffect(() => {
    localStorage.setItem('biblioteca_usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('biblioteca_prestamos', JSON.stringify(prestamos));
  }, [prestamos]);

  const registrarUsuario = (nuevoUsuario) => {
    setUsuarios([...usuarios, { ...nuevoUsuario, tipo: 'ESTUDIANTE' }]);
  };

  const editarPerfil = (correo, cambios) => {
    setUsuarios(usuarios.map((u) => (u.correo === correo ? { ...u, ...cambios } : u)));
    setUsuario((prev) => (prev && prev.correo === correo ? { ...prev, ...cambios } : prev));
  };

  const agregarLibro = (libro) => {
    const nuevoId = libros.length > 0 ? Math.max(...libros.map((l) => l.id)) + 1 : 1;
    setLibros([...libros, { id: nuevoId, ...libro }]);
  };

  const editarLibro = (id, cambios) => {
    setLibros(libros.map((l) => (l.id === id ? { ...l, ...cambios } : l)));
  };

  const eliminarLibro = (id) => {
    setLibros(libros.filter((l) => l.id !== id));
  };

  const pedirPrestamo = (libro, usuarioActual) => {
    if (libro.disponibles <= 0) return;

    setLibros(libros.map((l) =>
      l.id === libro.id ? { ...l, disponibles: l.disponibles - 1 } : l
    ));

    const hoy = new Date();
    const vencimiento = new Date();
    vencimiento.setDate(hoy.getDate() + 15);

    const nuevoPrestamo = {
      id: prestamos.length > 0 ? Math.max(...prestamos.map((p) => p.id)) + 1 : 1,
      correo: usuarioActual.correo,
      libroId: libro.id,
      libroTitulo: libro.titulo,
      fechaPrestamo: hoy.toLocaleDateString('es-CL'),
      fechaVencimiento: vencimiento.toLocaleDateString('es-CL'),
      estado: 'ACTIVO',
      solicitaDevolucion: false,
    };

    setPrestamos([...prestamos, nuevoPrestamo]);
  };

  // El estudiante marca que quiere devolver el libro: todavía sigue ACTIVO,
  // solo queda "marcado" para que el bibliotecario lo vea y lo confirme.
  const solicitarDevolucion = (idPrestamo) => {
    setPrestamos(prestamos.map((p) =>
      p.id === idPrestamo ? { ...p, solicitaDevolucion: true } : p
    ));
  };

  // El bibliotecario/administrador confirma: recién acá pasa a DEVUELTO
  // y se le suma 1 al stock disponible del libro correspondiente.
  const confirmarDevolucion = (idPrestamo) => {
    const prestamo = prestamos.find((p) => p.id === idPrestamo);
    if (!prestamo) return;

    setPrestamos(prestamos.map((p) =>
      p.id === idPrestamo ? { ...p, estado: 'DEVUELTO', solicitaDevolucion: false } : p
    ));

    setLibros(libros.map((l) =>
      l.id === prestamo.libroId ? { ...l, disponibles: l.disponibles + 1 } : l
    ));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorBoundary>
          <Navbar busqueda={busqueda} setBusqueda={setBusqueda} usuario={usuario} setUsuario={setUsuario} />
          <Routes>
            <Route path="/" element={<Inicio libros={libros} usuario={usuario} />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/actividad/:id" element={<DetalleActividad usuario={usuario} />} />
            <Route path="/catalogo" element={<Catalogo busqueda={busqueda} libros={libros} pedirPrestamo={pedirPrestamo} usuario={usuario} prestamos={prestamos} />} />
            <Route path="/categoria/:nombre" element={<Catalogo busqueda={busqueda} libros={libros} pedirPrestamo={pedirPrestamo} usuario={usuario} prestamos={prestamos} />} />
            <Route
              path="/usuarios"
              element={
                <RutaProtegida usuario={usuario} rolesPermitidos={['ADMINISTRADOR', 'BIBLIOTECARIO']}>
                  <Usuarios usuarios={usuarios} />
                </RutaProtegida>
              }
            />
            <Route
              path="/prestamos"
              element={
                <RutaProtegida usuario={usuario} rolesPermitidos={['ADMINISTRADOR', 'BIBLIOTECARIO']}>
                  <Prestamos prestamos={prestamos} confirmarDevolucion={confirmarDevolucion} />
                </RutaProtegida>
              }
            />
            <Route
              path="/reservas"
              element={
                <RutaProtegida usuario={usuario} rolesPermitidos={['ADMINISTRADOR', 'BIBLIOTECARIO']}>
                  <Reservas reservas={reservas} />
                </RutaProtegida>
              }
            />
            <Route path="/login" element={<Login usuarios={usuarios} setUsuario={setUsuario} />} />
            <Route path="/crear-cuenta" element={<CrearCuenta registrarUsuario={registrarUsuario} usuarios={usuarios} setUsuario={setUsuario} />} />
            <Route
              path="/perfil"
              element={
                <RutaProtegida usuario={usuario} rolesPermitidos={['ESTUDIANTE', 'BIBLIOTECARIO', 'ADMINISTRADOR']}>
                  <Perfil
                    usuario={usuario}
                    editarPerfil={editarPerfil}
                    misPrestamos={usuario ? prestamos.filter((p) => p.correo === usuario.correo) : []}
                    misReservas={usuario ? reservas.filter((r) => r.correo === usuario.correo) : []}
                    solicitarDevolucion={solicitarDevolucion}
                  />
                </RutaProtegida>
              }
            />
            <Route
              path="/panel"
              element={
                <RutaProtegida usuario={usuario} rolesPermitidos={['ADMINISTRADOR', 'BIBLIOTECARIO']}>
                  <PanelAdmin
                    usuario={usuario}
                    libros={libros}
                    agregarLibro={agregarLibro}
                    editarLibro={editarLibro}
                    eliminarLibro={eliminarLibro}
                    usuarios={usuarios}
                    prestamos={prestamos}
                    reservas={reservas}
                  />
                </RutaProtegida>
              }
            />
          </Routes>
          <Footer />
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}

export default App;