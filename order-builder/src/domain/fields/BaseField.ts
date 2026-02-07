// src/domain/fields/BaseField.ts

import { FieldTypes } from './FieldTypes';

export interface BaseField<TProps> {
  id: string;
  type: FieldTypes;
  order: number;
  props: TProps;
}
export { FieldTypes };
