import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { v4 as uuid } from 'uuid';

import { arrayMove } from '@dnd-kit/sortable';

import FieldPalette from './components/FieldPalette';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';
import logoCorders from './assets/LOGO FINAL.png';

function App() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    // 🔁 Reordenar campos existentes
    if (
      active.id !== over.id &&
      fields.find((f) => f.id === active.id) &&
      fields.find((f) => f.id === over.id)
    ) {
      setFields((prev) => {
        const oldIndex = prev.findIndex((f) => f.id === active.id);
        const newIndex = prev.findIndex((f) => f.id === over.id);

        const reordered = arrayMove(prev, oldIndex, newIndex);

        return reordered.map((field, index) => ({
          ...field,
          order: index,
        }));
      });
      return;
    }

    // ➕ Crear campo nuevo desde Sidebar
    if (over.id === 'canvas-dropzone' && active.data.current?.type) {
      const baseField = active.data.current;

      const newField = {
        id: uuid(),
        type: baseField.type,
        order: fields.length,
        props: {
          label: baseField.label,
          required: false,
          ...baseField.defaultProps,
        },
      };

      setFields((prev) => [...prev, newField]);
    }
  }

  function updateField(id, newProps) {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? { ...field, props: { ...field.props, ...newProps } }
          : field
      )
    );

    setSelectedField((prev) =>
      prev && prev.id === id
        ? { ...prev, props: { ...prev.props, ...newProps } }
        : prev
    );
  }

  function deleteField(id) {
    setFields((prev) => prev.filter((field) => field.id !== id));
    setSelectedField(null);
  }

  const columnStyle ={
    height: '100vh',
    padding:'24px 15px',
    boxSizing: 'border-box',
    display:'flex',
    flexDirection:'column',
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', height: '100vh', }}>
        <div style={{ ...columnStyle, width: '15%' }}>
          
          
          <div style={{ 
            marginBottom: '0px', 
            paddingBottom: '15px', 
            textAlign: 'center' 
          }}>
            <img 
              src={logoCorders} 
              alt="Logo Corders" 
              style={{ 
                width: '100%', 
                display: 'block',
                padding: '0'
              }} 
            />
          </div>

          <FieldPalette />
        </div>

        <div style={{ 
          width: '70%', 
          padding: '24px 40px', 
          boxSizing: 'border-box',
        
          }}>
          <Canvas
            fields={fields}
            setSelectedField={setSelectedField}
          />
        </div>

        <div style={{ 
          width: '20%', 
          padding: '10px'}}>
          <FieldEditor
            selectedField={selectedField}
            onUpdate={updateField}
            onDelete={deleteField}
          />
        </div>
      </div>
    </DndContext>
  );
}

export default App;
