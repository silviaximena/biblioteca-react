import React from 'react';
import { Table, Container } from 'react-bootstrap';
import BotonVolver from './BotonVolver';

const Usuarios = ({ usuarios }) => {
  return (
    <Container className="my-4">
      <BotonVolver />
      <div className="seccion-titulo">
        <span>Usuarios</span>
      </div>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: '#111111', color: '#fff' }}>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.correo}>
              <td>{index + 1}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>
                <span
                  style={{
                    backgroundColor: usuario.tipo === 'ADMINISTRADOR' ? '#f2c14e' : '#333',
                    color: usuario.tipo === 'ADMINISTRADOR' ? '#111' : '#fff',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {usuario.tipo}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Usuarios;