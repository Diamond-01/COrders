export default function FieldEditor({ selectedField, onUpdate, onDelete }) {
  if (!selectedField) {
    return <p>Selecciona un campo para editar</p>;
  }

  const { type, props } = selectedField;

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc' }}>
      <h3>Propiedades</h3>

      <p>
        <strong>Tipo:</strong> {type}
      </p>

      <div>
        <label>Etiqueta</label>
        <input
          type="text"
          value={props.label}
          onChange={(e) =>
            onUpdate(selectedField.id, {
              label: e.target.value,
            })
          }
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginTop: '8px' }}>
        <label>
          <input
            type="checkbox"
            checked={props.required}
            onChange={(e) =>
              onUpdate(selectedField.id, {
                required: e.target.checked,
              })
            }
          />
          {' '}Requerido
        </label>
      </div>
      <div>
        <button
        onClick={() => {
            const confirmed = window.confirm('¿Seguro que deseas eliminar este campo?');
            if (confirmed) {
            onDelete(selectedField.id);
            }
        }}
        style={{
            marginTop: '12px',
            background: '#c0392b',
            color: '#fff',
            border: 'none',
            padding: '6px 10px',
            cursor: 'pointer',
        }}
        >
        Eliminar campo
        </button>
      </div>
    </div>
  );
}