import { Field } from '../fields';

export interface OrderTemplateJSON {
  order: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    fields: Field[];
  };
}
