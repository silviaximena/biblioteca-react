import React, { useState } from 'react';
import { Table, Button, Form, Row, Col, Card, Badge, Image } from 'react-bootstrap';
import BotonVolver from './BotonVolver';

const colorEstado = { ACTIVO: 'success', ATRASADO: 'danger', DEVUELTO: 'secondary', VIGENTE: 'success', VENCIDA: 'secondary', CANCELADA: 'danger' };
const portadaPorDefecto = 'https://placehold.co/80x110/e9e1cb/333333?text=Sin+portada';

const PanelAdmin = ({ usuario, libros, agregarLibro, editarLibro, eliminarLibro, usuarios, prestamos, reservas }) => {
  const esAdmin = usuario.tipo === 'ADMINISTRADOR';
  const [moduloActivo, setModuloActivo] = useState('resumen');
  const [busquedaUsuario, setBusquedaUsuario] = useState('');

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ titulo: '', autor: '', stock: 1, disponibles: 1, portada: '', categoria: '' });

  const totalLibros = libros.length;
  const totalDisponibles = libros.reduce((sum, l) => sum + l.disponibles, 0);
  const totalAgotados = libros.filter((l) => l.disponibles === 0).length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const esNumero = name === 'stock' || name === 'disponibles';
    setForm((prev) => ({ ...prev, [name]: esNumero ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editandoId) editarLibro(editandoId, form);
    else agregarLibro(form);
    setForm({ titulo: '', autor: '', stock: 1, disponibles: 1, portada: '', categoria: '' });
    setEditandoId(null);
    setMostrarForm(false);
  };

  const iniciarEdicion = (libro) => {
    setForm({
      titulo: libro.titulo,
      autor: libro.autor,
      stock: libro.stock,
      disponibles: libro.disponibles,
      portada: libro.portada || '',
      categoria: libro.categoria || '',
    });
    setEditandoId(libro.id);
    setMostrarForm(true);
  };

  // --- Estado de cada usuario: préstamos activos/atrasados + reservas vigentes ---
  const calcularEstado = (correo) => {
    const susPrestamos = prestamos.filter((p) => p.correo === correo);
    const susReservas = reservas.filter((r) => r.correo === correo);
    const atrasados = susPrestamos.filter((p) => p.estado === 'ATRASADO').length;
    const activos = susPrestamos.filter((p) => p.estado === 'ACTIVO').length;
    const vigentes = susReservas.filter((r) => r.estado === 'VIGENTE').length;
    const pendiente = atrasados > 0 || vigentes > 0;
    return { atrasados, activos, vigentes, pendiente, susPrestamos, susReservas };
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const texto = busquedaUsuario.toLowerCase();
    return u.nombre.toLowerCase().includes(texto) || u.correo.toLowerCase().includes(texto);
  });

  const modulos = [
    { id: 'resumen', label: 'Resumen', roles: ['ADMINISTRADOR', 'BIBLIOTECARIO'] },
    { id: 'libros', label: 'Gestión de libros', roles: ['ADMINISTRADOR', 'BIBLIOTECARIO'] },
    { id: 'verificar', label: 'Verificar usuario', roles: ['ADMINISTRADOR', 'BIBLIOTECARIO'] },
    { id: 'usuarios', label: 'Usuarios', roles: ['ADMINISTRADOR'] },
  ];
  const modulosVisibles = modulos.filter((m) => m.roles.includes(usuario.tipo));

  return (
    <div style={{ display: 'flex', minHeight: '70vh' }}>
      <div style={{ width: '220px', backgroundColor: '#111111', padding: '20px 0', flexShrink: 0 }}>
        <div style={{ color: '#f2c14e', fontWeight: 700, fontSize: '13px', padding: '0 20px 16px', textTransform: 'uppercase' }}>
          {esAdmin ? 'Panel Admin' : 'Panel Bibliotecario'}
        </div>
        {modulosVisibles.map((m) => (
          <div
            key={m.id}
            onClick={() => setModuloActivo(m.id)}
            style={{
              padding: '12px 20px',
              color: moduloActivo === m.id ? '#f2c14e' : '#e8e8e8',
              backgroundColor: moduloActivo === m.id ? '#222' : 'transparent',
              borderLeft: moduloActivo === m.id ? '3px solid #f2c14e' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: moduloActivo === m.id ? 700 : 400,
            }}
          >
            {m.label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '20px 30px' }}>
        <BotonVolver />

        {moduloActivo === 'resumen' && (
          <>
            <div className="seccion-titulo"><span>Resumen</span></div>
            <Row className="g-3">
              <Col md={4}>
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <div style={{ fontSize: '28px', fontWeight: 700 }}>{totalLibros}</div>
                    <div style={{ color: '#777', fontSize: '13px' }}>Títulos totales</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#2f9e6e' }}>{totalDisponibles}</div>
                    <div style={{ color: '#777', fontSize: '13px' }}>Ejemplares disponibles</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#c0392b' }}>{totalAgotados}</div>
                    <div style={{ color: '#777', fontSize: '13px' }}>Títulos agotados</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}

        {moduloActivo === 'libros' && (
          <>
            <div className="seccion-titulo"><span>Gestión de libros</span></div>

            {esAdmin && (
              <div className="mb-3">
                <Button
                  className="btn-amarillo"
                  onClick={() => {
                    setMostrarForm(!mostrarForm);
                    setEditandoId(null);
                    setForm({ titulo: '', autor: '', stock: 1, disponibles: 1, portada: '', categoria: '' });
                  }}
                >
                  {mostrarForm ? 'Cancelar' : '+ Agregar libro'}
                </Button>
              </div>
            )}

            {esAdmin && mostrarForm && (
              <Card className="mb-4 p-3">
                <Form onSubmit={handleSubmit}>
                  <Row className="g-2">
                    <Col md={3}>
                      <Form.Control name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
                    </Col>
                    <Col md={3}>
                      <Form.Control name="autor" placeholder="Autor" value={form.autor} onChange={handleChange} required />
                    </Col>
                    <Col md={2}>
                      <Form.Control type="number" name="stock" placeholder="Stock" min="0" value={form.stock} onChange={handleChange} required />
                    </Col>
                    <Col md={2}>
                      <Form.Control type="number" name="disponibles" placeholder="Disponibles" min="0" value={form.disponibles} onChange={handleChange} required />
                    </Col>
                    <Col md={2}>
                      <Form.Control name="portada" placeholder="URL de la portada" value={form.portada} onChange={handleChange} />
                    </Col>
                  </Row>
                  <Row className="g-2 mt-2">
                    <Col md={3}>
                      <Form.Select name="categoria" value={form.categoria || ''} onChange={handleChange}>
                        <option value="">Categoría</option>
                        <option value="Novelas">Novelas</option>
                        <option value="Técnicos">Técnicos</option>
                        <option value="Infantil">Infantil</option>
                        <option value="Historia">Historia</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  {form.portada && (
                    <div style={{ marginTop: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#777', display: 'block', marginBottom: '4px' }}>Vista previa:</span>
                      <Image
                        src={form.portada}
                        alt="Vista previa de portada"
                        style={{ height: '90px', borderRadius: '4px', border: '1px solid #ddd' }}
                        onError={(e) => { e.target.src = portadaPorDefecto; }}
                      />
                    </div>
                  )}

                  <Button type="submit" className="btn-amarillo mt-3">
                    {editandoId ? 'Guardar cambios' : 'Agregar'}
                  </Button>
                </Form>
              </Card>
            )}

            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#111111', color: '#fff' }}>
                <tr>
                  <th>Portada</th><th>Título</th><th>Autor</th><th>Categoría</th><th>Stock</th><th>Disponibles</th><th>Estado</th>
                  {esAdmin && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {libros.map((libro) => (
                  <tr key={libro.id}>
                    <td>
                      <Image
                        src={libro.portada || portadaPorDefecto}
                        alt={libro.titulo}
                        style={{ width: '48px', height: '66px', objectFit: 'cover', borderRadius: '3px' }}
                        onError={(e) => { e.target.src = portadaPorDefecto; }}
                      />
                    </td>
                    <td>{libro.titulo}</td>
                    <td>{libro.autor}</td>
                    <td>{libro.categoria || <span style={{ color: '#bbb' }}>Sin asignar</span>}</td>
                    <td>{libro.stock}</td>
                    <td>{libro.disponibles}</td>
                    <td>{libro.disponibles === 0 ? <Badge bg="danger">Agotado</Badge> : <Badge bg="success">Disponible</Badge>}</td>
                    {esAdmin && (
                      <td>
                        <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => iniciarEdicion(libro)}>Editar</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => eliminarLibro(libro.id)}>Eliminar</Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {moduloActivo === 'verificar' && (
          <>
            <div className="seccion-titulo"><span>Verificar usuario</span></div>

            <Form.Control
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={busquedaUsuario}
              onChange={(e) => setBusquedaUsuario(e.target.value)}
              className="mb-3"
              style={{ maxWidth: '400px' }}
            />

            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#111111', color: '#fff' }}>
                <tr>
                  <th>Nombre</th><th>Correo</th><th>Tipo</th><th>Préstamos activos</th><th>Atrasados</th><th>Reservas vigentes</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u) => {
                  const estado = calcularEstado(u.correo);
                  return (
                    <tr key={u.correo}>
                      <td>{u.nombre}</td>
                      <td>{u.correo}</td>
                      <td>{u.tipo}</td>
                      <td>{estado.activos}</td>
                      <td>{estado.atrasados > 0 ? <Badge bg="danger">{estado.atrasados}</Badge> : 0}</td>
                      <td>{estado.vigentes}</td>
                      <td>
                        {estado.pendiente ? (
                          <Badge bg="danger">Pendiente</Badge>
                        ) : (
                          <Badge bg="success">Al día</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}

        {moduloActivo === 'usuarios' && esAdmin && (
          <>
            <div className="seccion-titulo"><span>Usuarios registrados</span></div>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#111111', color: '#fff' }}>
                <tr><th>#</th><th>Nombre</th><th>Correo</th><th>Tipo</th></tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={u.correo}>
                    <td>{i + 1}</td><td>{u.nombre}</td><td>{u.correo}</td><td>{u.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
};

export default PanelAdmin;