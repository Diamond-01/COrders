// src/domain/fields/TextField.ts

import { BaseField, FieldTypes } from './BaseField';

export interface TextField extends BaseField {
  type: FieldTypes.TEXT;
}