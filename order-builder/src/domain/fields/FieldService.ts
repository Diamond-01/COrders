// src/domain/fields/FieldService.ts

import { Field, createField } from './FieldFactory';
import { FieldTypes } from './FieldTypes';

export class FieldService {
  /**
   * Serializa un campo a formato JSON (para guardar/enviar)
   */
  static serialize(field: Field): any {
    const base = {
      id: field.id,
      type: field.type,
      label: field.label,
      required: field.required,
      order: field.order,
    };

    // ✅ Solo incluir 'options' si es un campo SELECT
    if (field.type === FieldTypes.SELECT) {
      return {
        ...base,
        props: {
          ...field.props,
          options: field.props.options,
        },
      };
    }

    // Para otros tipos, solo incluir props básicos
    return {
      ...base,
      props: {
        label: field.props.label,
        required: field.props.required,
      },
    };
  }

  /**
   * Serializa múltiples campos a JSON
   */
  static serializeAll(fields: Field[]): any[] {
    return fields.map(field => this.serialize(field));
  }

  /**
   * Crea un campo nuevo (wrapper conveniente)
   */
  static create(type: FieldTypes): Field {
    return createField(type);
  }
}