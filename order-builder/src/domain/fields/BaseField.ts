import { FieldTypes } from "./FieldTypes"

export interface BaseField {
    id : string;
    type: FieldTypes;
    label : string;
    required : boolean;
}