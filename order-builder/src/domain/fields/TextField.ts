import { BaseField } from "./BaseField";
import { FieldTypes } from "./FieldTypes";

export interface TextField extends BaseField {
    type: FieldTypes.TEXT;
    placeholder: string;
}

export const crearTextField = (id:string, overrides?:Partial<TextField>): TextField => ({
    id,
    type: FieldTypes.TEXT,
    label: "Texto",
    requeired: false,
    placeholder: "Ingrese texto",
    ...overrides,
});
