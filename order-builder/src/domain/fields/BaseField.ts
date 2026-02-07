// src/domain/fields/BaseField.ts

import { FieldTypes } from './FieldTypes';

export interface BaseField {
  id: string;
  type: FieldTypes;
  order: number;
  props: {
    label: string;
    required: boolean;
    [key: string]: any;
  };
}
export { FieldTypes };
