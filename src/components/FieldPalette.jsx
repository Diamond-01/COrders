import { useDraggable } from '@dnd-kit/core';

const FIELD_TYPES = [
  { type: 'text', label: 'TEXTO' },
  { type: 'number', label: 'NÚMERO' },
  { type: 'date', label: 'FECHA' },
  { type: 'select', label: 'SELECTOR' },
];

function DraggableField({ field }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: field.type,
    data: {
    source: 'palette',
    type: field.type,
    label: field.label,
    defaultProps: field.defaultProps ?? {},
    },
  });

  const style = {
    display: 'flex',            
    alignItems: 'center',       
    gap: '10px',
    marginBottom: '12px',
    fontSize: '15px',
    fontWeight: '500',
    // Texto blanco brillante solo si se arrastra, si no, gris claro
    color: isDragging ? '#FFFFFF' : '#E5E7EB', 
    cursor: isDragging ? 'grabbing' : 'grab',
    
    // Glassmorphism suave
    background: isDragging 
      ? 'rgba(31, 41, 55, 0.9)' // Gris oscuro sólido al arrastrar
      : 'rgba(255, 255, 255, 0.07)', // Un poquito más de opacidad aquí (era 0.03)
    

    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px) ${isDragging ? 'scale(1.05)' : ''}`
      : undefined,
      
    zIndex: isDragging ? 999 : 1,
    position: 'relative',
    backdropFilter: 'blur(8px)',
    borderRadius: '8px',
    boxSizing: 'border-box',
    width: '300px',
    maxWidth: '100%',
    minHeight: '5px',
    padding: '8px 22px',
    backgroundColor: '#111827', // Fondo profundo
    transition: isDragging
    ? 'background 0.3s, shadow 0.3s'
    : 'all 0.3s ease', // Animación más fluida
    
    /* Borde dinámico */
    border: isDragging 
      ? '1.5px solid #10B981' // Verde más grueso al arrastrar
      : '1px solid rgba(255, 255, 255, 0.15)', // Borde blanco suave pero visible
    
    /* Resplandor cuando algo está encima */
    boxShadow: isDragging
        ? '0 0 25px rgba(36, 206, 149, 0.15)' 
        : 'inset 0 2px 4px rgba(0, 0, 0, 0.3)', /* Sombra interna para profundidad */
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
      <h3 style={{ 
        color: '#FFFFFF', 
        fontSize: '25px', 
        fontWeight: '700', 
        marginBottom: '24px',
        letterSpacing: '1px',
        padding: '10px'
      }}>Campos</h3>
      {FIELD_TYPES.map((field) => (
        <DraggableField key={field.type} field={field} />
      ))}
    </div>
  );
}

