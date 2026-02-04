// src/domain/fields/BaseField.ts

export interface BaseField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  order: number;
  props: {
    label: string;
    required: boolean;
    [key: string]: any;
  };
}