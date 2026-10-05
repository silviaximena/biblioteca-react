import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotonVolver = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        background: 'none',
        border: 'none',
        color: '#333',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        padding: '16px 0 0 0',
          marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      ← Volver
    </button>
  );
};

export default BotonVolver;