// src/domain/fields/FieldFactory.ts

import { v4 as uuid } from 'uuid';
import { FieldTypes } from './FieldTypes';
import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { DateField } from './DateField';
import { SelectField, SelectOption } from './SelectField';

// Tipo unión de todos los campos
export type Field = TextField | NumberField | DateField | SelectField;

/**
 * Crea un nuevo campo con propiedades predeterminadas
 */
export function createField(type: FieldTypes): Field {
  const id = uuid();
  
  switch (type) {
    case FieldTypes.TEXT:
      return {
        id,
        type: FieldTypes.TEXT,
        label: 'Texto',
        required: false,
        order: 0,
        props: {
          label: 'Texto',
          required: false,
        },
      };

    case FieldTypes.NUMBER:
      return {
        id,
        type: FieldTypes.NUMBER,
        label: 'Número',
        required: false,
        order: 0,
        props: {
          label: 'Número',
          required: false,
        },
      };

    case FieldTypes.DATE:
      return {
        id,
        type: FieldTypes.DATE,
        label: 'Fecha',
        required: false,
        order: 0,
        props: {
          label: 'Fecha',
          required: false,
        },
      };

    case FieldTypes.SELECT:
      const defaultOptions: SelectOption[] = [
        { value: 'option1', label: 'Opción 1' },
        { value: 'option2', label: 'Opción 2' },
      ];
      
      return {
        id,
        type: FieldTypes.SELECT,
        label: 'Selector',
        required: false,
        order: 0,
        props: {
          label: 'Selector',
          required: false,
          options: defaultOptions, // Estas serán opciones predeterminadas
        },
      };

    default:
      throw new Error(`Tipo de campo no soportado: ${type}`);
  }
}