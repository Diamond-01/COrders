// src/App.tsx

import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuid } from 'uuid';

import FieldPalette from './components/FieldPalette';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';

// 🔑 Importar la interfaz BaseField para tipado correcto
import { BaseField } from './domain/fields/BaseField';

function App() {
  // ✅ Tipar el estado correctamente
  const [fields, setFields] = useState<BaseField[]>([]);
  const [selectedField, setSelectedField] = useState<BaseField | null>(null);

  // 🧪 Prueba inicial (opcional - puedes eliminar después)
  useEffect(() => {
    console.log('✅ App.tsx: Iniciando con campos vacíos');
  }, []);

  // 🔁 Reordenar campos existentes
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    // Reordenar campos existentes
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

    // Crear campo nuevo desde Sidebar
    if (over.id === 'canvas-dropzone' && active.data.current?.type) {
      const baseField = active.data.current;

      // ✅ Crear nuevo campo con estructura correcta
      const newField: BaseField = {
        id: uuid(),
        type: baseField.type,
        label: baseField.label || 'Campo',
        required: false,
        order: fields.length,
        props: {
          label: baseField.label || 'Campo',
          required: false,
          ...baseField.defaultProps,
        },
      };

      setFields((prev) => [...prev, newField]);
    }
  }

  // ✏️ Actualizar campo
  function updateField(id: string, newProps: Partial<{ label: string; required: boolean }>) {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
            ...field,
            label: newProps.label ?? field.label,
            required: newProps.required ?? field.required,
            props: {
              ...field.props,
              label: newProps.label ?? field.props.label,
              required: newProps.required ?? field.props.required,
            }
          }
          : field
      )
    );

    setSelectedField((prev) =>
      prev && prev.id === id
        ? {
          ...prev,
          label: newProps.label ?? prev.label,
          required: newProps.required ?? prev.required,
          props: {
            ...prev.props,
            label: newProps.label ?? prev.props.label,
            required: newProps.required ?? prev.props.required,
          }
        }
        : prev
    );
  }

  // 🗑️ Eliminar campo
  function deleteField(id: string) {
    setFields((prev) => prev.filter((field) => field.id !== id));
    setSelectedField(null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Paleta de campos */}
        <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '10px' }}>
          <FieldPalette />
        </div>

      
        {/* <div style={{ display: 'none' }}>
          <pre>{JSON.stringify(fields, null, 2)}</pre> 
        </div> */}

        {/* Canvas */}
        <div style={{ width: '60%', padding: '10px' }}>
          <Canvas
            fields={fields}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
          />
        </div>

        {/* Editor */}
        <div style={{ width: '20%', borderLeft: '1px solid #ccc', padding: '10px' }}>
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
