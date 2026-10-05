import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import BotonVolver from './BotonVolver';

const preguntas = [
  {
    pregunta: '¿Cómo pido un libro prestado?',
    respuesta: 'Ve al Catálogo, busca el libro que quieres y aprieta "Pedir préstamo" si está disponible.',
  },
  {
    pregunta: '¿Cuánto dura un préstamo?',
    respuesta: 'Los préstamos duran 15 días. Puedes ver la fecha exacta de devolución en la sección Préstamos.',
  },
  {
    pregunta: '¿Qué pasa si me atraso en devolver un libro?',
    respuesta: 'El préstamo queda marcado como "Atrasado" en tu cuenta, y puede generar una multa.',
  },
  {
    pregunta: '¿Puedo reservar un libro que está prestado?',
    respuesta: 'Sí, ve a Reservas y deja tu reserva; te avisaremos apenas el libro esté disponible.',
  },
];

const Ayuda = () => {
  return (
    <Container className="my-4" style={{ maxWidth: '700px' }}>
            <BotonVolver />
      <div className="seccion-titulo">
        <span>Preguntas frecuentes</span>
      </div>
      <Accordion>
        {preguntas.map((item, index) => (
          <Accordion.Item eventKey={String(index)} key={item.pregunta}>
            <Accordion.Header>{item.pregunta}</Accordion.Header>
            <Accordion.Body>{item.respuesta}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default Ayuda;