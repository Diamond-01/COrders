// src/App.tsx
import { useState } from 'react';
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

function BuilderPage() {
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateErrors, setTemplateErrors] = useState<string[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);

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
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
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
      alert('Plantilla guardada correctamente 🎉');
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error al conectar con el servidor');
    }
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
              💾 Guardar plantilla
            </button>
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

          <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <h3>Propiedades de la plantilla</h3>

            <input
              type="text"
              placeholder="Nombre de la plantilla"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
            />

            <textarea
              placeholder="Descripción"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              style={{ display: 'block', width: '100%' }}
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
