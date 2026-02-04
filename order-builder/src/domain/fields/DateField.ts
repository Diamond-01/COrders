import { BaseField } from "./BaseField";
import { FieldTypes } from "./FieldTypes";

export interface DateField extends BaseField{
    type: FieldTypes.DATE;
    }

export const crearDateField = (id:string, overrides?:Partial<DateField>): DateField => ({
    id,
    type: FieldTypes.DATE,
    label: "Fecha",
    required: false,
    ...overrides,
}); 
