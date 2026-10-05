import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Container, Badge, Alert, Button } from 'react-bootstrap';
import BotonVolver from './BotonVolver';
import BullseyeGame from './BullseyeGame';

const actividades = [
  {
    id: 'club-lectura',
    titulo: 'Club de lectura',
    etiqueta: 'Presencial',
    descripcion: 'Nos juntamos cada dos semanas a comentar un libro elegido en conjunto. Este mes: "Cien Años de Soledad".',
    horario: 'Cada 2 semanas, sábados 11:00 hrs',
    lugar: 'Sala de lectura, 2do piso',
  },
  {
    id: 'taller-escritura',
    titulo: 'Taller de escritura',
    etiqueta: 'Online',
    descripcion: 'Taller práctico para desarrollar tu propia voz narrativa, con ejercicios semanales y retroalimentación grupal.',
    horario: 'Martes 18:00 hrs, vía videollamada',
    lugar: 'Modalidad online',
  },
  {
    id: 'cuentacuentos',
    titulo: 'Cuentacuentos infantil',
    etiqueta: 'Presencial',
    descripcion: 'Actividad familiar para niños de 4 a 10 años, con lectura en voz alta e ilustraciones interactivas.',
    horario: 'Domingos 12:00 hrs',
    lugar: 'Sala infantil, 1er piso',
  },
  {
    // Nueva actividad: el juego de tiro al blanco.
    // requiereSesion + esJuego son banderas propias, no vienen de ningún lado más:
    // las usamos más abajo para decidir qué mostrar en esta misma pantalla.
    id: 'tiro-al-blanco',
    titulo: 'Tiro al blanco',
    etiqueta: 'Interactivo',
    descripcion: 'Un mini juego para hacer una pausa entre lecturas: tensá el arco, apuntá a la diana y sumá puntos.',
    horario: 'Disponible todos los días',
    lugar: 'Actividad en línea',
    requiereSesion: true,
    esJuego: true,
  },
];

const DetalleActividad = ({ usuario }) => {
  const { id } = useParams();
  const actividad = actividades.find((a) => a.id === id);

  if (!actividad) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <BotonVolver />
      <Badge bg="warning" text="dark" className="mb-2">{actividad.etiqueta}</Badge>
      <h2 style={{ fontFamily: 'Lora, serif', color: '#111', marginBottom: '16px' }}>{actividad.titulo}</h2>
      <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>{actividad.descripcion}</p>

      <div style={{ marginTop: '24px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>Horario</span>
          <span style={{ fontWeight: 600 }}>{actividad.horario}</span>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>Lugar</span>
          <span style={{ fontWeight: 600 }}>{actividad.lugar}</span>
        </div>
      </div>

      {actividad.esJuego && (
        <div style={{ marginTop: '32px', borderTop: '1px solid #eee', paddingTop: '24px' }}>
          {actividad.requiereSesion && !usuario ? (
            <Alert variant="light" style={{ border: '1px solid #eee' }}>
              <p style={{ marginBottom: '12px' }}>Necesitás iniciar sesión para jugar.</p>
              <Button as={Link} to="/login" variant="dark" size="sm">
                Iniciar sesión
              </Button>
            </Alert>
          ) : (
            <BullseyeGame />
          )}
        </div>
      )}
    </Container>
  );
};

export default DetalleActividad;