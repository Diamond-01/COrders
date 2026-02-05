import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableField({ field, onSelect, }) {
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
    background: '#fff',
    backgroundColor: '#1F2937', // Gris oscuro profesional
    border: '1px solid rgba(255, 255, 255, 0.1)', // Borde sutil
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    color: '#FFFFFF', // Texto blanco brillante
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)', // Sombra para dar profundidad
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* 🔹 SOLO DRAG */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          marginBottom: '4px',
          fontSize: '11px',
          color: '#6B7280', // Gris tenue
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: '600',
          display: 'block',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          
        }}
      >
        ☰ mover
      </div>

      {/* 🔹 SOLO CLICK */}
      <div onClick={() => onSelect(field)}>
        {field.props.label || (
          <span style={{ color: '#aaa', fontStyle: 'italic' }}>
            (Sin etiqueta)
          </span>
        )}
      </div>
    </div>
  );
}