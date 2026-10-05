import React from 'react';
import { Container, Table } from 'react-bootstrap';
import BotonVolver from './BotonVolver';


const horarios = [
  { dia: 'Lunes a Viernes', horario: '08:30 - 20:00' },
  { dia: 'Sábado', horario: '09:00 - 14:00' },
  { dia: 'Domingo y festivos', horario: 'Cerrado' },
];

const Horarios = () => {
  return (
    <Container className="my-4">
            <BotonVolver />
      <div className="seccion-titulo">
        <span>Horarios de atención</span>
      </div>
      <Table striped bordered hover responsive style={{ maxWidth: '500px', margin: '0 auto' }}>
        <thead style={{ backgroundColor: '#111111', color: '#fff' }}>
          <tr>
            <th>Día</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h) => (
            <tr key={h.dia}>
              <td>{h.dia}</td>
              <td>{h.horario}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '13px', marginTop: '16px' }}>
        Los horarios pueden variar en períodos de vacaciones. Consulta este sitio antes de venir.
      </p>
    </Container>
  );
};

export default Horarios;