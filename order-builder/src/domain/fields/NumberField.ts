// src/domain/fields/NumberField.ts

import { BaseField, FieldTypes } from './BaseField';
import { NumberFieldProps } from './FieldProps';

export interface NumberField extends BaseField<NumberFieldProps> {
  type: FieldTypes.NUMBER;
}