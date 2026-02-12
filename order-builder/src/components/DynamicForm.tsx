import { useState } from 'react';
import {jsPDF} from 'jspdf';

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



  return (
    <form style={{ marginTop: '2rem' }}>
      {sortedFields.map(field => {
        switch (field.type) {

          case 'text':
            return (
              <div key={field.id} style={{ marginBottom: '1rem' }}>
                <label>{field.props.label}</label>
                <input
                  type="text"
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
                <label>{field.props.label}</label>
                <input
                  type="number"
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
                <label>{field.props.label}</label>
                <input
                  type="date"
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
                <label>{field.props.label}</label>
                <select
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
            onClick={generatePDF}
        >
            Guardar como PDF
        </button>
      </div>

    </form>
  );
}
