// src/components/SortableField.tsx

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Field } from '../domain/fields';
import './sortableField.css';

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
  };

  return (
    <div ref={setNodeRef} style={style} className={`sortable-field ${isSelected ? 'sortable-field--selected' : ''}`}>
      {/* 🔹 SOLO DRAG */}
      <div
        {...attributes}
        {...listeners}
        className='sortable-field__drag-handle'
      >
        ☰ mover
      </div>

      {/* 🔹 SOLO CLICK */}
      <div className='sortable-field__label' onClick={() => onSelect(field)}>
        {field.props.label || ( // 👈 Debe ser field.label, no field.props.label
          <span className='sortable-field__label--empty'>
            (Sin etiqueta)
          </span>
        )}
      </div>
    </div>
  );
}