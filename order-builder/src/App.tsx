// src/App.tsx
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { createField } from './domain/fields/FieldFactory';
import { Field } from './domain/fields';

import FieldPalette from './components/FieldPalette';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';

import { buildOrderTemplate } from './domain/orderTemplate/buildOrderTemplate';
import { validateOrderTemplate } from './domain/orderTemplate/validateOrderTemplate';

const [templateErrors, setTemplateErrors] = useState<string[]>([]);

import './App.css';

function App() {
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

  const handleSaveTemplate = () =>{
    const template = buildOrderTemplate(fields);

    const errors = validateOrderTemplate(template);

    if (errors.length > 0) {
      setTemplateErrors(errors);
      return;
    }

    setTemplateErrors([]);

    // 🔜 Aquí irá el fetch al backend
    console.log('Plantilla lista para enviar:', template);
  }

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

export default App;
