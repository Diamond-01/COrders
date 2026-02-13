import { useEffect, useState } from 'react';
import DynamicForm from '../components/DynamicForm';



interface Template {
  id: string;
  title: string;
  description?: string;
  schema: any;
}

interface Props{
  onEditTemplate: (template: Template) => void;
}


export default function TemplatesPage({onEditTemplate}: Props) {
  const [useMode, setUseMode] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selected, setSelected] = useState<Template | null>(null);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('¿Seguro que deseas eliminar esta plantilla?');

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error eliminando');
      }

      // Si la eliminada era la seleccionada, limpiar panel derecho
      if (selected?.id === id) {
        setSelected(null);
        setUseMode(false);
      }

      // Recargar lista
      fetchTemplates();

    } catch (error) {
      console.error('Error eliminando:', error);
      alert('Error al eliminar la plantilla');
    }
  };

  const fetchTemplates = () => {
    fetch('http://localhost:3000/api/orders')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTemplates();
  }, []);


  const baseButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '8px',
  border: '1px solid transparent',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  fontSize: '14px',
  
};

const primaryButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#1e293b', // Fondo oscuro azulado
  border: '1px solid #38bdf8', // Borde celeste
  boxShadow: '0 0 3px rgba(56, 189, 248, 0.5)', // Brillo celeste
};

const dangerButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#7f1d1d', // Fondo rojo oscuro
  border: '1px solid #ef4444', // Borde rojo brillante
  boxShadow: '0 0 5px rgba(239, 68, 68, 0.5)', // Brillo rojo
};


  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
      
      {/* LISTA IZQUIERDA */}
      <div style={{
        width: '40%',
        borderRight: '1px solid #ccc',
        padding: '1rem',
        overflowY: 'auto'
      }}>
        <h3 style= {{color: '#FFFFFF', fontSize: '25px', padding: '0.5rem'
        }}>Plantillas guardadas</h3>

        {templates.map(template => (
          <div
            key={template.id}
            onClick={() => setSelected(template)}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontFamily: 'Arial, sans-serif',fontSize: '40px', marginBottom: '6px'}}>📄</div>
            <strong style={{ fontSize: '15px', color: '#FFFFFF'}}>{template.title}</strong>
          </div>
        ))}
      </div>

      {/* PANEL DERECHO */}
      <div style={{ flex: 1, padding: '2rem' }}>
        {!selected && <p>Selecciona una plantilla</p>}

        {selected && !useMode && (
          <>
            <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', color: '#FFFFFF'}}>{selected.title}</h2>
            <p>{selected.description}</p>

            <div style={{ display: 'flex', gap: '10px', padding: '1rem'}}>
              <button 
                style={primaryButtonStyle}
                onClick={() => setUseMode(true)}
              >
                Usar plantilla
              </button>

              <button style={primaryButtonStyle} onClick={()=> selected && onEditTemplate(selected)}>
                Editar plantilla
              </button>
              <button
                style={dangerButtonStyle}
                onClick={() => handleDelete(selected.id)}
              >
                🗑 Eliminar plantilla
              </button>

            </div>
          </>
        )}

        {selected && useMode && (
          <>
            <button onClick={() => setUseMode(false)}>
              ← Volver
            </button>

            <h2 style={{ fontSize: '25px', color: '#FFFFFF', fontFamily: 'Arial, sans-serif'}}>{selected.schema.name}</h2>

            <DynamicForm fields={selected.schema.fields} title ={selected.title} />
          </>
        )}
      </div>
    </div>
  );
}
