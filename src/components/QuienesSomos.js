import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BotonVolver from './BotonVolver';

const QuienesSomos = () => {
  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <BotonVolver />
      <div className="seccion-titulo">
        <span>Quiénes somos</span>
      </div>

      <p style={{ color: '#555', lineHeight: 1.7, fontSize: '15px' }}>
        La Biblioteca Municipal nació con el propósito de acercar el conocimiento y la lectura a toda la comunidad,
        ofreciendo un espacio gratuito donde estudiantes, familias y vecinos puedan acceder a libros, recursos digitales
        y actividades culturales.
      </p>
      <p style={{ color: '#555', lineHeight: 1.7, fontSize: '15px' }}>
        A lo largo de los años, hemos crecido junto a nuestra comunidad: desde un pequeño local con un puñado de libros
        donados, hasta convertirnos en un punto de encuentro para el aprendizaje, la creatividad y el intercambio de ideas
        entre generaciones.
      </p>

      <Row className="g-3 my-4">
        <Col md={6}>
          <div style={{ borderTop: '4px solid #f2c14e', backgroundColor: '#f5f5f5', padding: '18px', height: '100%' }}>
            <h6 style={{ fontFamily: 'Lora, serif', marginBottom: '10px' }}>Misión</h6>
            <p style={{ fontSize: '13px', color: '#555', margin: 0 }}>
              Facilitar el acceso libre y gratuito a la información, la lectura y la cultura, promoviendo el aprendizaje
              continuo de toda la comunidad.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div style={{ borderTop: '4px solid #f2c14e', backgroundColor: '#f5f5f5', padding: '18px', height: '100%' }}>
            <h6 style={{ fontFamily: 'Lora, serif', marginBottom: '10px' }}>Visión</h6>
            <p style={{ fontSize: '13px', color: '#555', margin: 0 }}>
              Ser un referente cultural y educativo de la comuna, integrando tecnología y espacios colaborativos para
              todas las edades.
            </p>
          </div>
        </Col>
      </Row>

      <h3 style={{ fontFamily: 'Lora, serif', color: '#111', marginTop: '32px', marginBottom: '16px' }}>
        Nuestra historia
      </h3>

      <div style={{ borderLeft: '3px solid #f2c14e', paddingLeft: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 700, color: '#f2c14e', fontSize: '13px' }}>2008</div>
          <p style={{ color: '#555', fontSize: '14px', margin: '4px 0 0' }}>
            Apertura de la primera sala de lectura municipal, con una colección inicial de 500 libros donados por
            vecinos y organizaciones locales.
          </p>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 700, color: '#f2c14e', fontSize: '13px' }}>2015</div>
          <p style={{ color: '#555', fontSize: '14px', margin: '4px 0 0' }}>
            Ampliación del edificio e incorporación de la sala infantil, junto con los primeros talleres de fomento
            lector para niños y niñas.
          </p>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 700, color: '#f2c14e', fontSize: '13px' }}>2020</div>
          <p style={{ color: '#555', fontSize: '14px', margin: '4px 0 0' }}>
            Digitalización del catálogo y lanzamiento de actividades online, adaptándose a las nuevas formas de
            acceder a la lectura.
          </p>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#f2c14e', fontSize: '13px' }}>Hoy</div>
          <p style={{ color: '#555', fontSize: '14px', margin: '4px 0 0' }}>
            Seguimos creciendo, con un sistema de gestión de préstamos y reservas propio, y una comunidad activa de
            lectores de todas las edades.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default QuienesSomos;