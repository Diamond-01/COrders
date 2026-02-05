// src/domain/fields/FieldService.ts

import { Field, createField } from './FieldFactory';
import { FieldTypes } from './FieldTypes';

export class FieldService {
  /**
   * ! Serializa un campo a formato JSON (para guardar/enviar)
   */
  static serialize(field: Field): any {
    const base = {
      id: field.id,
      type: field.type,
      label: field.label,
      required: field.required,
      order: field.order,
    };

    // Si es un campo de tipo SELECT, se incluyen las opciones
    if (field.type === FieldTypes.SELECT) {
      return {
        ...base,
        props: {
          ...field.props,
          options: field.props.options,
        },
      };
    }

    // Para otros tipos, solo se incluyen propiedades básicos
    return {
      ...base,
      props: {
        label: field.props.label,
        required: field.props.required,
      },
    };
  }

  /**
   * ? Serializa múltiples campos a JSON
   */
  static serializeAll(fields: Field[]): any[] {
    return fields.map(field => this.serialize(field));
  }

  /**
   * ? Crea un campo nuevo
   */
  static create(type: FieldTypes): Field {
    return createField(type);
  }
}