import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ usuario, rolesPermitidos, children }) => {
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!rolesPermitidos.includes(usuario.tipo)) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h3>Acceso no autorizado</h3>
        <p style={{ color: '#666' }}>Tu cuenta ({usuario.tipo}) no tiene permiso para ver esta página.</p>
      </div>
    );
  }

  return children;
};

export default RutaProtegida;