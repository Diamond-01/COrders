// src/domain/fields/index.ts

// Exportar tipos con 'export type'
export { FieldTypes } from './FieldTypes';

// Exportar interfaces y tipos
export type { Field } from './FieldFactory';
export type { SelectOption, SelectField } from './SelectField';

// Exportar funciones y clases
export { createField } from './FieldFactory';
export { FieldService } from './FieldService';