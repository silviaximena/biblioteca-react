import React from 'react';
import { Table, Container, Badge, Button } from 'react-bootstrap';
import BotonVolver from './BotonVolver';

const colorEstado = { ACTIVO: 'success', ATRASADO: 'danger', DEVUELTO: 'secondary' };

const Prestamos = ({ prestamos, confirmarDevolucion }) => {
  return (
    <Container className="my-4">
      <BotonVolver />
      <div className="seccion-titulo">
        <span>Préstamos</span>
      </div>
      {prestamos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No hay préstamos registrados.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead style={{ backgroundColor: '#111111', color: '#fff' }}>
            <tr><th>#</th><th>Correo</th><th>Libro</th><th>Vence</th><th>Estado</th><th>Devolución</th></tr>
          </thead>
          <tbody>
            {prestamos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.correo}</td>
                <td>{p.libroTitulo}</td>
                <td>{p.fechaVencimiento}</td>
                <td><Badge bg={colorEstado[p.estado]}>{p.estado}</Badge></td>
                <td>
                  {p.estado === 'DEVUELTO' ? (
                    <span style={{ color: '#888', fontSize: '13px' }}>—</span>
                  ) : p.solicitaDevolucion ? (
                    <Button size="sm" className="btn-amarillo" onClick={() => confirmarDevolucion(p.id)}>
                      Confirmar devolución
                    </Button>
                  ) : (
                    <span style={{ color: '#aaa', fontSize: '13px' }}>Sin solicitud</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Prestamos;