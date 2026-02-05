import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableField from './sortableField.jsx';

export default function Canvas({ fields, selectedField, setSelectedField }) {
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
        border: '2px solid hsla(160, 84%, 39%, 0.50)',
        background: isOver ? 'rgba(255, 255, 255, 0.03)': 'transparent',
        backdropFilter: 'blur (8px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',                // Esto separa las tarjetas entre sí de forma exacta
        padding: '24px'
      }}
    >
      <h3 style={{
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        fontFamily: 'Inter, sans-serif',
        fontweight: '700', /* Negrita fuerte */
        letterspacing: '-0.02em', /* Un poco más junta para que se vea moderna */
        color: '#ffffff', 
        fontWeight: '700', 
        fontSize: '35px', 
        marginBottom: '10px',
        

      }} > Orden de Pedido</h3 >

      {
        fields.length === 0 && (
          <p style={{
            color: '#9CA3AF',         
            fontStyle: 'italic',        
            fontSize: '14px', 
            marginBottom: '25px'

          }}>
            Arrastra campos aquí para construir tu orden
          </p>
        )
      }

      < SortableContext
        items={orderedFields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {
          fields.map((field) => (
            <SortableField
              key={field.id}
              field={field}
              onSelect={setSelectedField}
              isSelected={selectedField?.id === field.id}
            />
          ))
        }
      </SortableContext >
    </div >
  );
}