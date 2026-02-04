// src/domain/fields/NumberField.ts

import { BaseField, FieldTypes } from './BaseField';

export interface NumberField extends BaseField {
  type: FieldTypes.NUMBER;
}