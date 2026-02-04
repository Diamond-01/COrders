import { FieldTypes } from "./FieldTypes";
import { crearTextField } from "./TextField";
import { crearNumberField } from "./NumberField";
import { crearDateField } from "./DateField";
import { crearSelectField } from "./SelectField";
import { Field } from "./Field";

export const crearField = (type: FieldTypes, id: string): Field => {
    switch (type) {
        case FieldTypes.TEXT:
            return crearTextField(id);
        case FieldTypes.NUMBER:
            return crearNumberField(id);
        case FieldTypes.DATE:
            return crearDateField(id);
        case FieldTypes.SELECT:
            return crearSelectField(id);    
        default:
            throw new Error(`Tipo de campo no soportado: ${type}`);
    }           
};
