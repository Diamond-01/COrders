// src/components/FieldEditor.tsx
import { Field, FieldTypes, SelectField } from '../domain/fields';
import './FieldEditor.css'

export default function FieldEditor({
  field,
  onUpdate,
  onDelete,
}: {
  field: Field | null;
  onUpdate: (id: string, props: any) => void;
  onDelete: (id: string) => void;
}) {
  if (!field) {
    return <p>Selecciona un campo para editar</p>;
  }

  const { id, type } = field;
  const props = field.props;

  return (
    <div className='Fiel-editor'>
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
            onUpdate(id, { label: e.target.value })
          }
        />
      </div>
      <div>
        <label>
          <input 
            type="checkbox"
            checked={props.required}
            onChange={(e) =>
              onUpdate(id, { required: e.target.checked })
            }
          />
          {' '}Requerido
        </label>
      </div>
      {field.type === FieldTypes.SELECT && (
        <div className='fiel-editor__section'>
          <h4>Opciones</h4>

          {(field as SelectField).props.options.map((opt, index) => (
            <div key={index} className='field-editor__option-row'>
              <input
                type="text"
                value={opt.label}
                onChange={(e) => {
                  const options = [...(field as SelectField).props.options];
                  options[index] = { ...opt, label: e.target.value };
                  onUpdate(field.id, { options });
                }}
              />

              <button
                type="button"
                onClick={() => {
                  const options = (field as SelectField).props.options.filter(
                    (_, i) => i !== index
                  );
                  onUpdate(field.id, { options });
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              onUpdate(field.id, {
                options: [
                  ...(field as SelectField).props.options,
                  { value: `opt-${Date.now()}`, label: 'Nueva opción' },
                ],
              })
            }
          >
            + Agregar opción
          </button>
        </div>
      )}

      {field.type === FieldTypes.NUMBER && (
        <div className='fiel-editor__section'>
          <h4>Configuración numérica</h4>

          <div>
            <label>Mínimo</label>
            <input
              type="number"
              value={field.props.min ?? ''}
              onChange={(e) =>
                onUpdate(id, {
                  min: e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label>Máximo</label>
            <input
              type="number"
              value={field.props.max ?? ''}
              onChange={(e) =>
                onUpdate(id, {
                  max: e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      )}

      {field.type === FieldTypes.DATE && (
        <div className='fiel-editor__section'>
          <h4>Configuración de fecha</h4>

          <div>
            <label>Fecha mínima</label>
            <input
              type="date"
              value={field.props.minDate ?? ''}
              onChange={(e) =>
                onUpdate(id, { minDate: e.target.value || undefined })
              }
            />
          </div>

          <div>
            <label>Fecha máxima</label>
            <input
              type="date"
              value={field.props.maxDate ?? ''}
              onChange={(e) =>
                onUpdate(id, { maxDate: e.target.value || undefined })
              }
            />
          </div>
        </div>
      )}

      {field.type === FieldTypes.TEXT && (
        <div className='fiel-editor__section'>
          <h4>Configuración de texto</h4>

          <div>
            <label>Placeholder</label>
            <input
              type="text"
              value={field.props.placeholder ?? ''}
              onChange={(e) =>
                onUpdate(id, { placeholder: e.target.value })
              }
            />
          </div>

          <div>
            <label>Longitud máxima</label>
            <input
              type="number"
              value={field.props.maxLength ?? ''}
              onChange={(e) =>
                onUpdate(id, {
                  maxLength:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      )}

      <div> 
        <button
        onClick={() => {
            const confirmed = window.confirm('¿Seguro que deseas eliminar este campo?');
            if (confirmed) {
            onDelete(id);
            }
        }}
        className='field-editor__delete-btn'
        >
        Eliminar campo
        </button>
      </div>
    </div>
  );
}