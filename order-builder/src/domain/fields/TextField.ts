// src/domain/fields/TextField.ts

import { BaseField, FieldTypes } from './BaseField';
import { TextFieldProps } from './FieldProps';

export interface TextField extends BaseField<TextFieldProps> {
  type: FieldTypes.TEXT;
}