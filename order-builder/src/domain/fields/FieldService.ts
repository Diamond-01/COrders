// src/domain/fields/FieldService.ts

import { Field, createField } from './FieldFactory';
import { FieldTypes } from './FieldTypes';

export class FieldService {
  /**
   * Serializa un campo a formato JSON (con el fin de poder guardar/enviar)
   */
  static serialize(field: Field): any {
    const base = {
      id: field.id,
      type: field.type,
      label: field.label,
      required: field.required,
      order: field.order,
    };

  
    if (field.type === FieldTypes.SELECT) { //Si es un campo de tipo select, entonces tendra opciones.
      return {
        ...base,
        props: {
          ...field.props,
          options: field.props.options,
        },
      };
    }

    
    return { // Para otros tipos de campo, solo se le incluyen las propiedades básicas
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
   * Crea un campo nuevo (wrappper)
   */
  static create(type: FieldTypes): Field {
    return createField(type);
  }
}