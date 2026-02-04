// src/components/Canvas.tsx

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableField from './sortableField';
import { BaseField } from '../domain/fields/BaseField';

export default function Canvas({ 
  fields, 
  selectedField, 
  setSelectedField 
}: { 
  fields: BaseField[];
  selectedField: BaseField | null;
  setSelectedField: (field: BaseField | null) => void;
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
      style={{
        minHeight: '300px',
        padding: '10px',
        border: '2px dashed #aaa',
        background: isOver ? '#eef' : 'transparent',
      }}
    >
      <h3>Orden de Pedido</h3>

      {fields.length === 0 && (
        <p style={{ color: '#777' }}>
          Arrastra campos aquí para construir tu orden
        </p>
      )}

      <SortableContext
        items={orderedFields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {fields.map((field) => (
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