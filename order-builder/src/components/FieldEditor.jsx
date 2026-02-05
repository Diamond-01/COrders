export default function FieldEditor({ selectedField, onUpdate, onDelete }) {
  // 1. Estado cuando no hay nada seleccionado
  if (!selectedField) {
    return (
      <div style={{
        padding: '24px 24px',
        textAlign: 'center',
        marginTop: '40px',
        backgroundColor: '#111827', // Fondo oscuro profundo
        height: '100%'
      }}>
        <p style={{ color: '#6B7280', fontSize: '16px', fontWeight: '400' }}>
          Selecciona un campo para editar sus propiedades
        </p>
      </div>
    );
  }

  const { type, props } = selectedField;

  // 2. Definición de estilos internos
  const styleLabel = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#9CA3AF',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const styleInput = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #374151',
    backgroundColor: '#111827',
    color: '#FFFFFF',
    boxSizing: 'border-box',
    outline: 'none',
    fontSize: '14px',
    marginBottom: '20px'
  };

  // 3. Renderizado del editor
  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#1F2937', // Panel lateral un poco más claro
      height: '100vh',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF'
    }}>

      <h3 style={{ 
        color: '#FFFFFFF', 
        fontSize: '25px', 
        fontWeight: '700', 
        marginBottom: '24px', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
        paddingBottom: '12px',
        LetterSpacing: '1px'
      
      }}>
        Propiedades
      </h3>

      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
          <strong style={{ color: '#10B981' }}>Tipo de campo:</strong> {type}
        </p>
      </div>

      <div>
        <label style={styleLabel}>Etiqueta del campo</label>
        <input
          type="text"
          value={['TEXTO', 'NÚMERO', 'FECHA', 'SELECTOR'].includes(props.label) ? '' : props.label}
          placeholder="Ej: Nombre Completo"
          onChange={(e) =>
            onUpdate(selectedField.id, {
              label: e.target.value,
            })
          }
          style={styleInput}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '30px' }}>
        <input
          type="checkbox"
          id="required"
          checked={props.required}
          onChange={(e) =>
            onUpdate(selectedField.id, {
              required: e.target.checked,
            })
          }
          style={{
            cursor: 'pointer',
            accentColor: '#10B981',
            width: '18px',
            height: '18px'
          }}
        />
        <label htmlFor="required" style={{
          color: '#D1D5DB',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center', // Esto los alinea verticalmente al centro
          gap: '10px',
          marginTop: '15px'
        }}>
          CAMPO OBLIGATORIO
        </label>
      </div>

      <button
        onClick={() => {
          const confirmed = window.confirm('¿Seguro que deseas eliminar este campo?');
          if (confirmed) {
            onDelete(selectedField.id);
          }
        }}
        style={{
          width: '100%',
          background: 'transparent',
          color: '#EF4444',
          border: '1px solid #EF4444',
          borderRadius: '8px',
          padding: '12px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#EF4444';
          e.target.style.color = '#FFFFFF';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#EF4444';
        }}
      >
        ELIMINAR CAMPO
      </button>
    </div>
  );
}