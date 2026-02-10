import { Field } from '../fields';
import { OrderTemplateJSON } from './orderTemplate';

interface BuildTemplateMeta {
  id?: string;
  name?: string;
  description?: string;
}

export function buildOrderTemplate(
  fields: Field[],
  meta?: BuildTemplateMeta
): OrderTemplateJSON {
  const now = new Date().toISOString();

  return {
    order: {
      id: meta?.id ?? crypto.randomUUID(),
      name: meta?.name ?? 'Plantilla sin nombre',
      description: meta?.description ?? '',
      createdAt: now,
      updatedAt: now,
      fields,
    },
  };
}
