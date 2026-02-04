// src/domain/fields/BaseField.ts

import { FieldTypes } from './FieldTypes';

export interface BaseField {
  id: string;
  type: FieldTypes; // ✅ Ahora usa el enum oficial
  label: string;
  required: boolean;
  order: number;
  props: {
    label: string;
    required: boolean;
    [key: string]: any;
  };
}