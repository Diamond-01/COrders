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

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
      
      {/* LISTA IZQUIERDA */}
      <div style={{
        width: '40%',
        borderRight: '1px solid #ccc',
        padding: '1rem',
        overflowY: 'auto'
      }}>
        <h3>Plantillas guardadas</h3>

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
            <div style={{ fontSize: '40px' }}>📄</div>
            <strong>{template.title}</strong>
          </div>
        ))}
      </div>

      {/* PANEL DERECHO */}
      <div style={{ flex: 1, padding: '2rem' }}>
        {!selected && <p>Selecciona una plantilla</p>}

        {selected && !useMode && (
          <>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>

            <div style={{ marginTop: '2rem' }}>
              <button 
                style={{ marginRight: '1rem' }}
                onClick={() => setUseMode(true)}
              >
                Usar plantilla
              </button>

              <button onClick={()=> selected && onEditTemplate(selected)}>
                Editar plantilla
              </button>
              <button
                style={{
                  backgroundColor: '#ff4d4f',
                  marginTop: '2rem',
                  marginLeft: '1rem',
                  color: 'white',
                  cursor: 'pointer'
                }}
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

            <h2>{selected.schema.name}</h2>

            <DynamicForm fields={selected.schema.fields} title ={selected.title} />
          </>
        )}
      </div>
    </div>
  );
}
