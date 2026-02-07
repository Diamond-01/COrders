// src/App.tsx

import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';


import { createField } from './domain/fields/FieldFactory'; //se importa la funcion createField
import { Field } from './domain/fields';

import FieldPalette from './components/FieldPalette';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';

function App() { //todo Falta Integrar la logica de campos a App.tsx
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    // Para reordenar
    if (active.id !== over.id && fields.find(f => f.id === active.id)) {
      setFields(prev => {
        const oldIndex = prev.findIndex(f => f.id === active.id);
        const newIndex = prev.findIndex(f => f.id === over.id);
        const reordered = arrayMove(prev, oldIndex, newIndex);
        return reordered.map((f, i) => ({ ...f, order: i }));
      });
      return;
    }

    // Creamos un nuevo campo
    if (over.id === 'canvas-dropzone' && active.data.current?.type) {
      const baseField = active.data.current;

      try {
        const newField = createField(baseField.type);
        console.log('Campo creado:', newField); // PRUEBAS CONSOLA

        setFields(prev => [
          ...prev,
          {
            ...newField,
            order: prev.length,
          }
        ]);
      } catch (error) {
        console.error('Error al crear campo:', error); //PRUEBA ERROR
      }
    }
  };

  //Actualiza un campo
  const updateField = (id: string, updates: any) => {
    setFields(prev =>
      prev.map(f =>
        f.id === id
          ? {
              ...f,
              props: {
                ...f.props,
                ...updates,
              },
            }
          : f
      )
    );

    setSelectedField(prev =>
      prev?.id === id
        ? {
            ...prev,
            props: {
              ...prev.props,
              ...updates,
            },
          }
        : prev
    );
  };

  const deleteField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
    setSelectedField(null);
  };

  return (


    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '10px' }}>
          <FieldPalette />
        </div>
        <div style={{ width: '60%', padding: '10px' }}>
          <Canvas fields={fields} selectedField={selectedField} setSelectedField={setSelectedField} />
        </div>
        
        <div style={{ width: '20%', borderLeft: '1px solid #ccc', padding: '10px' }}>
          <FieldEditor field={selectedField} onUpdate={updateField} onDelete={deleteField} />
        </div>
        {/* <button onClick={() => {
          console.log('📄 Campos actuales:', fields); // PRUEBAS
        }}>
          Ver campos
        </button> */}
      </div>
    </DndContext>



  );
}

export default App;