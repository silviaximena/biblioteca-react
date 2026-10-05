import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavegacionBiblioteca = ({ busqueda, setBusqueda, usuario, setUsuario }) => {
  const navigate = useNavigate();

  const handleBuscar = () => navigate('/catalogo');

  const cerrarSesion = () => {
    setUsuario(null);
    navigate('/');
  };

  const puedeVerPanel = usuario && (usuario.tipo === 'ADMINISTRADOR' || usuario.tipo === 'BIBLIOTECARIO');

  return (
    <div style={{ backgroundColor: '#111111', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 700, fontSize: '18px', textDecoration: 'none' }}>
          Biblioteca Municipal
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#e8e8e8', fontSize: '14px', textDecoration: 'none' }}>Inicio</Link>
          <Link to="/catalogo" style={{ color: '#e8e8e8', fontSize: '14px', textDecoration: 'none' }}>Catálogo</Link>
          {puedeVerPanel && (
  <Link to="/usuarios" style={{ color: '#e8e8e8', fontSize: '14px', textDecoration: 'none' }}>Usuarios</Link>
)}
         {puedeVerPanel && (
  <>
    <Link to="/prestamos" style={{ color: '#e8e8e8', fontSize: '14px', textDecoration: 'none' }}>Préstamos</Link>
    <Link to="/reservas" style={{ color: '#e8e8e8', fontSize: '14px', textDecoration: 'none' }}>Reservas</Link>
  </>
)}

          {puedeVerPanel && (
            <Link to="/panel" style={{ color: '#f2c14e', fontSize: '14px', textDecoration: 'none', fontWeight: 700 }}>
              Panel
            </Link>
          )}

          {usuario ? (
  <>
    <Link to="/perfil" style={{ color: '#aaa', fontSize: '13px', textDecoration: 'none' }}>
      {usuario.nombre}{' '}
      <span style={{ color: '#666' }}>({usuario.tipo})</span>
    </Link>
              <button
                onClick={cerrarSesion}
                style={{ background: 'none', border: '1px solid #555', color: '#e8e8e8', borderRadius: '14px', padding: '4px 12px', fontSize: '13px', cursor: 'pointer' }}
              >
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: '#f2c14e', fontSize: '14px', textDecoration: 'none' }}>Ingresar</Link>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Buscar libros, autores..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
          style={{ flex: 1, border: 'none', borderRadius: '20px', padding: '10px 16px', fontSize: '14px' }}
        />
        <button className="btn-amarillo" style={{ borderRadius: '20px', padding: '10px 20px', fontSize: '14px' }} onClick={handleBuscar}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default NavegacionBiblioteca;