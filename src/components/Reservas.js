import React from 'react';
import { Table, Container, Badge } from 'react-bootstrap';
import BotonVolver from './BotonVolver';

const reservas = [
  { id: 1, usuario: 'Mauricio Machuca', libro: 'PL/SQL para Principiantes', fecha: '14-09-2026', estado: 'VIGENTE' },
];

const colorEstado = {
  VIGENTE: 'success',
  VENCIDA: 'secondary',
  CANCELADA: 'danger',
};

const Reservas = () => {
  return (
    <Container className="my-4">
            <BotonVolver />
      <div className="seccion-titulo">
        <span>Reservas</span>
      </div>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: '#111111', color: '#fff' }}>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Libro</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.usuario}</td>
              <td>{reserva.libro}</td>
              <td>{reserva.fecha}</td>
              <td>
                <Badge bg={colorEstado[reserva.estado]}>{reserva.estado}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Reservas;