import { useEffect, useState } from 'react';
import DynamicForm from '../components/DynamicForm';

interface Template {
  id: string;
  title: string;
  description?: string;
  schema: any;
}

export default function TemplatesPage() {
  const [useMode, setUseMode] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selected, setSelected] = useState<Template | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/orders')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(err => console.error(err));
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

              <button>
                Editar plantilla
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
