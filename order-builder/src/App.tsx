// src/App.tsx
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { createField } from './domain/fields/FieldFactory';
import { Field } from './domain/fields';

import FieldPalette from './components/FieldPalette';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';

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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="app-layout">
        <aside className="app-sidebar app-sidebar--left">
          <FieldPalette />
        </aside>

        <main className="app-canvas">
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
