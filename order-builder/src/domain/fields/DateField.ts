// src/domain/fields/DateField.ts

import { BaseField, FieldTypes } from './BaseField';
import { DateFieldProps } from './FieldProps';

export interface DateField extends BaseField<DateFieldProps> {
  type: FieldTypes.DATE;
}