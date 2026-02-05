// src/domain/fields/SelectField.ts

import { BaseField, FieldTypes } from './BaseField';

// se define la estructura de las opciones
export interface SelectOption {
  value: string;
  label: string;
}

// campo selector tiene opciones
export interface SelectField extends BaseField {
  type: FieldTypes.SELECT;
  props: {
    label: string;
    required: boolean;
    options: SelectOption[]; // aqui van las opciones
  };
}