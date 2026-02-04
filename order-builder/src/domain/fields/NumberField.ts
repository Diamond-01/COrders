import { BaseField } from "./BaseField";
import { FieldTypes } from "./FieldTypes";

export interface NumberField extends BaseField{
    type: FieldTypes.NUMBER;
    min: number | null;
    max: number | null;
}

export const crearNumberField = (id:string, overrides?:Partial<NumberField>): NumberField => ({
    id,
    type: FieldTypes.NUMBER,
    label: "Número",
    required: false,
    min: null,
    max: null,
    ...overrides,
});     
