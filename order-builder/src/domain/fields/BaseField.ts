// src/domain/fields/BaseField.ts

import { FieldTypes } from './FieldTypes';

export interface BaseField {
  id: string;
  type: FieldTypes; // enum se utiliza aqui
  label: string;
  required: boolean;
  order: number;
  props: {
    label: string;
    required: boolean;
    [key: string]: any;
  };
}

export { FieldTypes };
