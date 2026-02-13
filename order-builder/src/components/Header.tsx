import React, { useState } from 'react';
import logoFinal from '../assets/LOGO_FINAL.png';

interface HeaderProps {
  onNavigate: (page: 'builder' | 'templates') => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [activeTab, setActiveTab] = useState<'builder' | 'templates'>('builder');

  const handlePress = (page: 'builder' | 'templates') => {
    setActiveTab(page);
    onNavigate(page);
  };

  // 1. Estilo base profesional (Separados y con relieve)
  const buttonBase: React.CSSProperties = {
    padding: '12px 28px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    outline: 'none',
    margin: '0 10px', // ESTA ES LA SEPARACIÓN FÍSICA
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  };

  // 2. Función para obtener el estilo dinámico por botón
  const getButtonStyle = (page: 'builder' | 'templates'): React.CSSProperties => {
    const isActive = activeTab === page;
    return {
      ...buttonBase,
      backgroundColor: isActive ? '#3bba61' : '#1e293b',
      color: isActive ? '#0f172a' : '#94a3b8',
      boxShadow: isActive 
        ? '0 10px 15px -3px rgba(56, 189, 248, 0.3)' 
        : '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
      border: isActive ? 'none' : '1px solid #334155'
    };
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#0f172a',
      borderBottom: '1px solid #1e293b' // Cambié el gris claro por uno oscuro para que combine
    }}>
      
      <img
          src={logoFinal}
          alt="LOGO PROYECTO"
          className="field-palette__logo"
        />

      {/* Contenedor de navegación sin fondo para que los botones se vean sueltos */}
      <div style={{ display: 'flex' }}>
        <button 
          style={getButtonStyle('builder')} 
          onClick={() => handlePress('builder')}
        >
          <span>🛠️</span>
          Builder
        </button>

        <button 
          style={getButtonStyle('templates')} 
          onClick={() => handlePress('templates')}
        >
          <span>📋</span>
          Plantillas
        </button>
      </div>
      
    </header>
  );
}
