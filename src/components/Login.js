import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import BotonVolver from './BotonVolver';

const Login = ({ usuarios, setUsuario }) => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const encontrado = usuarios.find(
      (u) => u.correo === correo.trim().toLowerCase() && u.clave === clave
    );

    if (!encontrado) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    setError('');
    setUsuario(encontrado);
    navigate('/');
  };

  return (
    <Container className="my-5" style={{ maxWidth: '420px' }}>
      <BotonVolver />
      <div className="seccion-titulo">
        <span>Iniciar sesión</span>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="nombre@duoc.cl" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button type="submit" className="btn-amarillo w-100 mb-3">Ingresar</Button>

        <div style={{ textAlign: 'center', fontSize: '14px' }}>
          ¿No tienes cuenta? <Link to="/crear-cuenta">Regístrate aquí</Link>
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
          Cuentas del sistema (clave: 1234):<br />
          biblioteca@duoc.cl (bibliotecario) · mauricio@profesor.duoc.cl (admin)
        </div>
      </Form>
    </Container>
  );
};

export default Login;