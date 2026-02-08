// src/test-fields.ts

// Imports
import { FieldTypes } from './domain/fields/FieldTypes';
import { FieldService } from './domain/fields/FieldService';

console.log('=== INICIANDO PRUEBAS DE CAMPOS ===');

try {
  // PRUEBA 1: Crear campos
  const textField = FieldService.create(FieldTypes.TEXT);
  const selectField = FieldService.create(FieldTypes.SELECT);

  console.log('✅ Campos creados correctamente');
  console.log('TextField:', textField);
  console.log('SelectField:', selectField);

  // PRUEBA 2 : Verificar options
  if (selectField.props && 'options' in selectField.props) {
    console.log('✅ SelectField tiene options:', selectField.props.options);
  }

  // PRUEBA 3: Serialización
  const textJson = FieldService.serialize(textField);
  const selectJson = FieldService.serialize(selectField);

  console.log('✅ Serialización exitosa');
  console.log('TextField JSON:', JSON.stringify(textJson, null, 2));
  console.log('SelectField JSON:', JSON.stringify(selectJson, null, 2));

  console.log('\n🎉 TODAS LAS PRUEBAS PASARON!');
} catch (error) {
  console.error('❌ ERROR:', error);
}