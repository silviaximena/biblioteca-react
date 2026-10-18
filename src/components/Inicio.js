import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const actividades = [
    {
        id: 'club-lectura',
        titulo: 'Club de lectura',
        etiqueta: 'Presencial',
        descripcion: 'Nos juntamos cada dos semanas a comentar un libro elegido en conjunto. Este mes: "Cien Años de Soledad".',
        horario: 'Cada 2 semanas, sábados 11:00 hrs',
        lugar: 'Sala de lectura, 2do piso',
        imagen: 'https://images.pexels.com/photos/4861364/pexels-photo-4861364.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 'taller-escritura',
        titulo: 'Taller de escritura',
        etiqueta: 'Online',
        descripcion: 'Taller práctico para desarrollar tu propia voz narrativa, con ejercicios semanales y retroalimentación grupal.',
        horario: 'Martes 18:00 hrs, vía videollamada',
        lugar: 'Modalidad online',
        imagen: 'https://images.pexels.com/photos/7095/people-coffee-notes-tea.jpg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 'cuentacuentos',
        titulo: 'Cuentacuentos infantil',
        etiqueta: 'Presencial',
        descripcion: 'Actividad familiar para niños de 4 a 10 años, con lectura en voz alta e ilustraciones interactivas.',
        horario: 'Domingos 12:00 hrs',
        lugar: 'Sala infantil, 1er piso',
        imagen: 'https://images.pexels.com/photos/5608541/pexels-photo-5608541.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        // Cuarta tarjeta: lleva a /actividad/tiro-al-blanco, donde vive el juego
        id: 'tiro-al-blanco',
        titulo: 'Tiro al blanco',
        etiqueta: 'Interactivo',
        descripcion: 'Un mini juego para hacer una pausa entre lecturas: tensa el arco, apunta a la diana y suma puntos.',
        horario: 'Disponible todos los días',
        lugar: 'Actividad en línea',
        imagen: 'https://images.pexels.com/photos/6669396/pexels-photo-6669396.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
];

const recursos = [
    { titulo: 'Catálogo general', desc: 'Explora todos los libros disponibles en la biblioteca, por categoría o autor.' },
    { titulo: 'Reserva de salas', desc: 'Agenda una sala de estudio grupal o individual con anticipación.' },
    { titulo: 'Recursos digitales', desc: 'Accede a libros electrónicos y artículos desde cualquier dispositivo.' },
    { titulo: 'Renovaciones', desc: 'Extiende el plazo de tus préstamos activos antes de que venzan.' },
];

const portadaPorDefecto = 'https://placehold.co/300x180/e9e1cb/333333?text=Sin+portada';

const obtenerServicios = (usuario) => [
    { titulo: 'Mi cuenta', ruta: usuario ? '/perfil' : '/login' },
    { titulo: 'Catálogo', ruta: '/catalogo' },
    { titulo: 'Horarios', ruta: '/horarios' },
    { titulo: 'Reservas', ruta: '/reservas' },
    { titulo: 'Ayuda', ruta: '/ayuda' },
];

const Inicio = ({ libros, usuario }) => {
    const servicios = obtenerServicios(usuario);

    return (
        <Container className="my-4">
            <div className="seccion-titulo">
                <span>Servicios</span>
            </div>
            <Row className="g-2 mb-5 justify-content-center">
                {servicios.map((servicio) => (
                    <Col xs={6} md={2} key={servicio.titulo}>
                        <Link to={servicio.ruta} style={{ textDecoration: 'none' }}>
                            <div
                                style={{
                                    height: '90px',
                                    backgroundColor: '#111111',
                                    borderBottom: '4px solid #f2c14e',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    textAlign: 'center',
                                    borderRadius: '6px',
                                    padding: '8px',
                                    cursor: 'pointer',
                                }}
                            >
                                {servicio.titulo}
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>

            <div className="seccion-titulo">
                <span>Actividades</span>
            </div>
            <Row className="g-3 mb-5">
                {actividades.map((actividad) => (
                    <Col xs={12} sm={6} lg={3} key={actividad.id}>
                        <Link to={`/actividad/${actividad.id}`} style={{ textDecoration: 'none' }}>
                            <div
                                style={{
                                    backgroundColor: '#333',
                                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%), url(${actividad.imagen})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '6px',
                                    height: '140px',
                                    padding: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    cursor: 'pointer',
                                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.25)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                <span style={{ backgroundColor: '#f2c14e', color: '#111', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', width: 'fit-content', marginBottom: '6px' }}>
                  {actividad.etiqueta}
                </span>
                                <span style={{ color: '#fff', fontWeight: 500 }}>{actividad.titulo}</span>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>

            <div className="seccion-titulo">
                <span>Recursos de la biblioteca</span>
            </div>
            <Row className="g-3 mb-5">
                {recursos.map((recurso) => (
                    <Col md={3} key={recurso.titulo}>
                        <div style={{ borderTop: '4px solid #f2c14e', backgroundColor: '#f5f5f5', padding: '14px', height: '100%' }}>
                            <h6 style={{ fontFamily: 'Lora, serif', marginBottom: '8px' }}>{recurso.titulo}</h6>
                            <p style={{ fontSize: '13px', color: '#555' }}>{recurso.desc}</p>
                        </div>
                    </Col>
                ))}
            </Row>

            <div className="seccion-titulo">
                <span>Destacado esta semana</span>
            </div>
            <Row className="g-3 mb-4">
                {libros.slice(0, 3).map((libro) => (
                    <Col md={4} key={libro.id}>
                        <Link to="/catalogo" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    backgroundColor: '#111111',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    height: '160px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.18s ease',
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <img
                                    src={libro.portada || portadaPorDefecto}
                                    alt={libro.titulo}
                                    style={{ width: '110px', height: '100%', objectFit: 'cover', flexShrink: 0 }}
                                    onError={(e) => { e.target.src = portadaPorDefecto; }}
                                />
                                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ backgroundColor: '#f2c14e', color: '#111', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', width: 'fit-content', marginBottom: '8px' }}>
                    {libro.categoria || 'Recomendado'}
                  </span>
                                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{libro.titulo}</div>
                                    <div style={{ color: '#aaa', fontSize: '12px' }}>{libro.autor}</div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link to="/catalogo" className="btn btn-amarillo btn-sm">
                    Ver catálogo completo →
                </Link>
            </div>
        </Container>
    );
};

export default Inicio;