import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import BotonVolver from './BotonVolver';

const CrearCuenta = ({ registrarUsuario, usuarios, setUsuario }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const correoLimpio = correo.trim().toLowerCase();

    if (!nombre || !correoLimpio || !clave || !fechaNacimiento) {
      setError('Completa todos los campos.');
      setExito(false);
      return;
    }

    if (!correoLimpio.endsWith('@duoc.cl') && !correoLimpio.endsWith('@profesor.duoc.cl')) {
      setError('El correo debe ser @duoc.cl o @profesor.duoc.cl');
      setExito(false);
      return;
    }

    const hoy = new Date().toISOString().split('T')[0];
    if (fechaNacimiento > hoy) {
      setError('La fecha de nacimiento no puede ser una fecha futura.');
      setExito(false);
      return;
    }

    if (usuarios.some((u) => u.correo === correoLimpio)) {
      setError('Ya existe una cuenta con ese correo.');
      setExito(false);
      return;
    }

    const nuevoUsuario = { nombre, correo: correoLimpio, clave, fechaNacimiento, tipo: 'ESTUDIANTE' };
    registrarUsuario(nuevoUsuario);
    setError('');
    setExito(true);
    setUsuario(nuevoUsuario);

    setTimeout(() => {
      navigate('/', { state: { bienvenida: nombre } });
    }, 2500);
  };

  return (
    <Container className="my-5" style={{ maxWidth: '420px', position: 'relative' }}>
      <BotonVolver />

      {exito && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          style={{ position: 'fixed', top: 0, left: 0 }}
        />
      )}

      <div className="seccion-titulo">
        <span>Crear cuenta</span>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={exito} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo institucional</Form.Label>
          <Form.Control type="email" placeholder="nombre@duoc.cl" value={correo} onChange={(e) => setCorreo(e.target.value)} disabled={exito} />
          <Form.Text muted>@duoc.cl para estudiantes, @profesor.duoc.cl para docentes.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} disabled={exito} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} disabled={exito} />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}
        {exito && (
          <Alert variant="success">
            ¡Bienvenido/a a Biblioteca Municipal, {nombre}! Te estamos llevando a Inicio...
          </Alert>
        )}

        {!exito && <Button type="submit" className="btn-amarillo w-100 mb-3">Registrarse</Button>}
        {!exito && (
          <div style={{ textAlign: 'center', fontSize: '14px' }}>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default CrearCuenta;