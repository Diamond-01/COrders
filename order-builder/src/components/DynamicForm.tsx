import { useState } from 'react';
import { jsPDF } from 'jspdf';

interface Field {
  id: string;
  type: string;
  order: number;
  props: any;
}

interface Props {
  fields: Field[];
  title: string;
}

export default function DynamicForm({ fields, title }: Props) {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleChange = (id: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  const generatePDF = () => {
    const doc = new jsPDF();

    let y = 20;

    // 🔹 TÍTULO
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(title || 'Formulario', 105, y, { align: 'center' });

    y += 8;

    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    y += 12;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, y);

    y += 15;

    sortedFields.forEach(field => {
      let value = values[field.id] ?? '';

      // 🔹 Si es SELECT → convertir value a label
      if (field.type === 'select') {
        const selectedOption = field.props.options?.find(
          (opt: any) => opt.value === value
        );
        value = selectedOption?.label ?? value;
      }

      // 🔹 Salto automático si está cerca del final
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      // LABEL
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(field.props.label, 20, y);

      y += 6;

      // VALOR (permite texto largo con wrap automático)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      const splitText = doc.splitTextToSize(String(value || ' '), 170);
      doc.text(splitText, 20, y);

      y += splitText.length * 6;

      y += 8; // Espacio extra entre campos
    });

    doc.save(`${title || 'formulario'}.pdf`);
  };


  const labelStyle: React.CSSProperties = {
    color: '#a3d9f0', // Cambia aquí el color elegido
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    display: 'block',
    fontFamily: 'sans-serif'
  };

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',           // Para que ocupen el ancho disponible
    maxWidth: '300px',       // Para que no sean infinitamente largos
    backgroundColor: '#1a1a2e', // El fondo oscuro que usamos antes
    color: '#ffffff',           // Texto blanco
    border: '1px solid #334155', // Borde sutil
    borderRadius: '6px',
    padding: '8px 12px',
    marginBottom: '15px',    // Espacio entre campos
    outline: 'none',
    boxSizing: 'border-box'  // Para que no se desfacen
  };


  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#485c83',
    color: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s'
  };


  return (
    <form>
      {sortedFields.map(field => {
        switch (field.type) {

          case 'text':
            return (
              <div key={field.id} style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{field.props.label}</label>
                <input
                  type="text" style={inputStyle}
                  required={field.props.required}
                  placeholder={field.props.placeholder}
                  onChange={(e) =>
                    handleChange(field.id, e.target.value)
                  }
                />
              </div>
            );

          case 'number':
            return (
              <div key={field.id} style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{field.props.label}</label>
                <input
                  type="number" style={inputStyle}
                  required={field.props.required}
                  min={field.props.min}
                  max={field.props.max}
                  onChange={(e) =>
                    handleChange(field.id, e.target.value)
                  }
                />
              </div>
            );

          case 'date':
            return (
              <div key={field.id} style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{field.props.label}</label>
                <input
                  type="date" style={inputStyle}
                  required={field.props.required}
                  min={field.props.minDate}
                  max={field.props.maxDate}
                  onChange={(e) =>
                    handleChange(field.id, e.target.value)
                  }
                />
              </div>
            );

          case 'select':
            return (
              <div key={field.id} style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{field.props.label}</label>
                <select style={inputStyle}
                  required={field.props.required}
                  onChange={(e) =>
                    handleChange(field.id, e.target.value)
                  }
                >
                  <option value="">Seleccionar</option>
                  {field.props.options?.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );

          default:
            return null;
        }
      })}

      <div style={{ marginTop: '2rem' }}>
        <button
          type="button"
          style={buttonStyle}
          onMouseOver={(e) => {
            
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onClick={generatePDF}
        >
          Guardar como PDF
        </button>
      </div>

    </form>
  );
}
