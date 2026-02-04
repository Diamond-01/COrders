import { BaseField } from "./BaseField";
import { FieldTypes } from "./FieldTypes";

export interface SelectOption {
    value:string;
    label:string;

}


export interface SelectField extends BaseField{
    type: FieldTypes.SELECT;
    options: SelectOption[];
}

export const crearSelectField = (id:string, overrides?:Partial<SelectField>): SelectField => ({
    id,
    type: FieldTypes.SELECT,
    label: "Selector",
    required: false,
    options: [],
    ...overrides,
});


