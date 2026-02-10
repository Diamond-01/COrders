import { OrderTemplateJSON } from './orderTemplate';
import { FieldTypes, Field, SelectField } from '../fields';

export function validateOrderTemplate(
  template: OrderTemplateJSON
): string[] {
  const errors: string[] = [];

  const fields = template.order.fields;

  if (!Array.isArray(fields) || fields.length === 0) {
    errors.push('La plantilla debe contener al menos un campo');
    return errors;
  }

  fields.forEach((field, index) => {
    // order
    if (typeof field.order !== 'number') {
      errors.push(`El campo en posición ${index} no tiene "order" válido`);
    }

    const { label, required } = field.props;

    if (!label || label.trim() === '') {
      errors.push(`El campo "${field.id}" no tiene etiqueta`);
    }

    if (typeof required !== 'boolean') {
      errors.push(`El campo "${label}" no define "required" correctamente`);
    }

    // Validación por tipo
    switch (field.type) {
      case FieldTypes.TEXT:
        checkExtraProps(field, ['label', 'required', 'placeholder', 'maxLength'], errors);
        break;

      case FieldTypes.NUMBER:
        checkExtraProps(field, ['label', 'required', 'min', 'max'], errors);
        break;

      case FieldTypes.DATE:
        checkExtraProps(field, ['label', 'required', 'minDate', 'maxDate'], errors);
        break;

      case FieldTypes.SELECT: {
        const selectField = field as SelectField;

        if (!Array.isArray(selectField.props.options)) {
          errors.push(`El campo select "${label}" no tiene options`);
        } else if (selectField.props.options.length === 0) {
          errors.push(`El campo select "${label}" debe tener al menos una opción`);
        }

        checkExtraProps(field, ['label', 'required', 'options'], errors);
        break;
      }

      default:
        errors.push(`Tipo de campo desconocido: ${(field as any).type}`);
    }
  });

  return errors;
}

function checkExtraProps(
  field: Field,
  allowed: string[],
  errors: string[]
) {
  Object.keys(field.props).forEach(prop => {
    if (!allowed.includes(prop)) {
      errors.push(
        `Propiedad no permitida "${prop}" en campo "${field.props.label}"`
      );
    }
  });
}
