import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { conError: false };
  }

  static getDerivedStateFromError() {
    return { conError: true };
  }

  componentDidCatch(error) {
    console.warn('Error capturado por ErrorBoundary:', error.message);
  }

  handleReintentar = () => {
    this.setState({ conError: false });
  };

  render() {
    if (this.state.conError) {
      return (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h3>Ocurrió un problema al mostrar esta página</h3>
          <p style={{ color: '#777', marginBottom: '20px' }}>
            Esto puede pasar si el navegador está traduciendo la página. Prueba recargar.
          </p>
          <button className="btn btn-amarillo" onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;