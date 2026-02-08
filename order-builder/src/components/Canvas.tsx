// src/components/Canvas.tsx

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableField from './sortableField';
import { Field } from '../domain/fields';
import './Canvas.css';

export default function Canvas({
  fields,
  selectedField,
  setSelectedField,
}: {
  fields: Field[];
  selectedField: Field | null;
  setSelectedField: (field: Field | null) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-dropzone',
  });

  const orderedFields = [...fields].sort(
    (a, b) => a.order - b.order
  );

  return (
    <div
      ref={setNodeRef}
      className={`canvas ${isOver ? 'canvas--over' : ''}`}
    >
      <h3 className="canvas__title">Orden de Pedido</h3>

      {fields.length === 0 && (
        <p className='canvas__empty'>
          Arrastra campos aquí para construir tu orden
        </p>
      )}

      <SortableContext
        items={orderedFields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {orderedFields.map((field) => (
          <SortableField
            key={field.id}
            field={field}
            onSelect={setSelectedField}
            isSelected={selectedField?.id === field.id}
          />
        ))}
      </SortableContext>
    </div>
  );
}