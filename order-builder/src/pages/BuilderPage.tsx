// src/App.tsx
import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { createField } from '../domain/fields/FieldFactory';
import { Field } from '../domain/fields';

import FieldPalette from '../components/FieldPalette';
import Canvas from '../components/Canvas';
import FieldEditor from '../components/FieldEditor';

import { buildOrderTemplate } from '../domain/orderTemplate/buildOrderTemplate';
import { validateOrderTemplate } from '../domain/orderTemplate/validateOrderTemplate';

import './BuilderPage.css';

interface BuilderPageProps {
  initialTemplate?: any;
  clearEditing?: () => void;
}

function BuilderPage({ initialTemplate, clearEditing }: BuilderPageProps) {

  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateErrors, setTemplateErrors] = useState<string[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);

  useEffect(() => {
    if (!initialTemplate) return;

    console.log("InitialTemplate recibido", initialTemplate)

    setTemplateId(initialTemplate.id || null);
    setTemplateName(initialTemplate.title || '');
    setTemplateDescription(initialTemplate.description || '');
    setFields(initialTemplate.schema.fields || []);
  }, [initialTemplate]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id && fields.find(f => f.id === active.id)) {
      setFields(prev => {
        const oldIndex = prev.findIndex(f => f.id === active.id);
        const newIndex = prev.findIndex(f => f.id === over.id);
        const reordered = arrayMove(prev, oldIndex, newIndex);
        return reordered.map((f, i) => ({ ...f, order: i }));
      });
      return;
    }

    if (over.id === 'canvas-dropzone' && active.data.current?.type) {
      const baseField = active.data.current;
      const newField = createField(baseField.type);

      setFields(prev => [
        ...prev,
        {
          ...newField,
          order: prev.length,
        },
      ]);
    }
  };

  const updateField = (id: string, updates: any) => {
    setFields(prev =>
      prev.map(f =>
        f.id === id
          ? { ...f, props: { ...f.props, ...updates } }
          : f
      )
    );

    setSelectedField(prev =>
      prev?.id === id
        ? { ...prev, props: { ...prev.props, ...updates } }
        : prev
    );
  };

  const deleteField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
    setSelectedField(null);
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      setTemplateErrors(['La plantilla debe tener un nombre']);
      return;
    }

    const template = buildOrderTemplate(fields, {
      name: templateName,
      description: templateDescription,
    });

    const errors = validateOrderTemplate(template);

    if (errors.length > 0) {
      setTemplateErrors(errors);
      return;
    }

    setTemplateErrors([]);

    try {
      const isEditing = !!templateId;

      const url = isEditing
        ? `http://localhost:3000/api/orders/${templateId}`
        : 'http://localhost:3000/api/orders';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template.order),
      });

      if (!response.ok) {
        throw new Error('Error al guardar en el servidor');
      }

      const data = await response.json();

      console.log('✅ Guardado correctamente:', data);
      alert(
        isEditing
          ? 'Plantilla actualizada correctamente ✔'
          : 'Plantilla guardada correctamente 🎉'
      );
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const handleCancelEdit = () => {
    setTemplateId(null);
    setTemplateName('');
    setTemplateDescription('');
    setFields([]);
    setSelectedField(null);

    if (clearEditing) {
      clearEditing();
    }
  };

  const inputStyle: React.CSSProperties = {
              display: 'block',
              width: '100%',
              backgroundColor: '#232335', // Fondo oscuro
              color: '#ffffff',           // Texto blanco
              border: '1px solid #30363d', // Borde sutil
              borderRadius: '6px',        // Bordes redondeados
              padding: '10px',            // Espaciado interno
              outline: 'none',            // Quita el resaltado azul de Windows
              marginBottom: '0.8rem',      // Separación
              boxSizing: 'border-box' // ESTO ES CLAVE: evita que el padding "estire" el cuadro más del 100%
            };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="app-layout">
        <aside className="app-sidebar app-sidebar--left">
          <FieldPalette />
        </aside>

        <main className="app-canvas">
          <div className='app-canvas__actions'>
            <button className='app-save-button' onClick={handleSaveTemplate}>
              💾 {templateId ? 'Actualizar plantilla' : 'Guardar plantilla'}
            </button>

            {templateId && (
              <button
                className='app-cancel-button'
                onClick={handleCancelEdit}
                style={{ marginLeft: '1rem' }}
              >
                ❌ Cancelar edición
              </button>
            )}

            {templateErrors.length > 0 && (
              <div className="app-errors">
                <h4>Errores de la plantilla</h4>
                <ul>
                  {templateErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          <div style={{
            padding: '1rem',
            
          }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '25px', padding: '0.5rem' }}>Propiedades de la plantilla</h3>

            

            <input
              type="text"
              placeholder="Nombre de la plantilla"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Descripción"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              style={{ ...inputStyle, marginBottom: '15px', resize: 'vertical'}}
            />
          </div>
          <Canvas
            fields={fields}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
          />
        </main>

        <aside className="app-sidebar app-sidebar--right">
          <FieldEditor
            field={selectedField}
            onUpdate={updateField}
            onDelete={deleteField}
          />
        </aside>
      </div>
    </DndContext>
  );
}

export default BuilderPage;
