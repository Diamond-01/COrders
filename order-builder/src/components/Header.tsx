import logoFinal from '../assets/LOGO_FINAL.png';

interface HeaderProps {
  onNavigate: (page: 'builder' | 'templates') => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      borderBottom: '1px solid #ccc'
    }}>
      <img
          src={logoFinal}
          alt="LOGO PROYECTO"
          className="field-palette__logo"
        />

      <div>
        <button onClick={() => onNavigate('builder')}>
          Builder
        </button>

        <button onClick={() => onNavigate('templates')}>
          Plantillas
        </button>
      </div>
    </header>
  );
}
