import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111111', color: '#e8e8e8', padding: '24px', marginTop: '40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ fontFamily: 'Lora, serif', fontWeight: 700, color: '#fff', fontSize: '16px', marginBottom: '6px' }}>
            Biblioteca Municipal
          </div>
          <p style={{ fontSize: '13px', color: '#aaa', maxWidth: '280px' }}>
            Sistema de gestión de préstamos, catálogo y reservas para la comunidad.
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
            <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Inicio</Link>
            <Link to="/catalogo" style={{ color: '#ccc', textDecoration: 'none' }}>Catálogo</Link>
            <Link to="/quienes-somos" style={{ color: '#ccc', textDecoration: 'none' }}>Quiénes somos</Link>
          </div>
        </div>

        <div>
          <div style={{ color: '#f2c14e', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Contacto</div>
          <div style={{ fontSize: '13px', color: '#ccc' }}>contacto@bibliotecamunicipal.cl</div>
          <div style={{ fontSize: '13px', color: '#ccc' }}>+56 9 0000 0000</div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #333', marginTop: '18px', paddingTop: '12px', textAlign: 'center', fontSize: '12px', color: '#777' }}>
        © 2026 Biblioteca Municipal — Proyecto DSY1104
      </div>
    </footer>
  );
};

export default Footer;