// src/domain/fields/DateField.ts

import { BaseField, FieldTypes } from './BaseField';

export interface DateField extends BaseField {
  type: FieldTypes.DATE;
}