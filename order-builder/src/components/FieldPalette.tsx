// src/components/FieldPalette.tsx

import { useDraggable } from '@dnd-kit/core';
import { FieldTypes } from '../domain/fields';

// Definimos tipo para los campos de la paleta
interface PaletteField {
  type: FieldTypes;
  label: string;
  //defaultProps?: Record<string, any>;
}

// Tipamos FIELD_TYPES
const FIELD_TYPES: PaletteField[] = [
  { type: FieldTypes.TEXT, label: 'Texto' },
  { type: FieldTypes.NUMBER, label: 'Número' },
  { type: FieldTypes.DATE, label: 'Fecha' },
  { type: FieldTypes.SELECT, label: 'Selector' },
];

// tipado a DraggableField
function DraggableField({ field }: { field: PaletteField }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: field.type,
    data: {
      source: 'palette',
      type: field.type,
      label: field.label,
      //defaultProps: field.defaultProps ?? {},
    },
  });

  const style = {
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '6px',
    cursor: 'grab',
    background: '#f9f9f9',
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {field.label}
    </div>
  );
}

export default function FieldPalette() {
  return (
    <div>
      <h3>Campos</h3>
      {FIELD_TYPES.map((field) => (
        <DraggableField key={field.type} field={field} />
      ))}
    </div>
  );
}