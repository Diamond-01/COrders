// src/domain/fields/SelectField.ts

import { BaseField, FieldTypes } from './BaseField';
import { SelectFieldProps } from './FieldProps';

// Definimos la estructura de las opciones
export interface SelectOption {
  value: string;
  label: string;
}

// El campo selector tiene opciones
export interface SelectField extends BaseField<SelectFieldProps> {
  type: FieldTypes.SELECT;
  props: {
    label: string;
    required: boolean;
    options: SelectOption[]; // ! Esta es una propiedad clave
  };
}