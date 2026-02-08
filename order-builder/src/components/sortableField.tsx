// src/components/SortableField.tsx

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Field } from '../domain/fields';

export default function SortableField({
  field,
  onSelect,
  isSelected
}: {
  field: Field;
  onSelect: (field: Field) => void;
  isSelected: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    border: isSelected ? '2px solid #3498db' : '1px solid #555',
    marginBottom: '6px',
    background: '#fff',
  };

  return (


    <div ref={setNodeRef} style={style}>
      {/* 🔹 SOLO DRAG */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          background: '#eee',
          padding: '4px',
          marginBottom: '4px',
          fontSize: '12px',
        }}
      >
        ☰ mover
      </div>

      {/* 🔹 SOLO CLICK */}
      <div onClick={() => onSelect(field)}>
        {field.props.label || ( // 👈 Debe ser field.label, no field.props.label
          <span style={{ color: '#aaa', fontStyle: 'italic' }}>
            (Sin etiqueta)
          </span>
        )}
      </div>
    </div>
  );
}