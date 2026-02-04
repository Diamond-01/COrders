const VALID_TYPES = ['text', 'number', 'date', 'select'];

const validateOrderStructure = (orderData) => {
    // 1. Validar el título
    if (!orderData.title || typeof orderData.title !== 'string') {
        throw new Error("El campo 'title' es obligatorio y debe ser texto");
    }

    // 2. Validar que 'fields' existe y es una lista
    if (!Array.isArray(orderData.fields)) {
        throw new Error("El campo 'fields' es obligatorio y debe ser un array");
    }

    // 3. Validar cada campo individualmente
    orderData.fields.forEach((field, index) => {
        // ¿Tiene ID?
        if (!field.id) {
            throw new Error(`El campo en la posición ${index} no tiene 'id'`);
        }
        
        // ¿Tiene type válido?
        if (!field.type || !VALID_TYPES.includes(field.type)) {
            throw new Error(`El campo '${field.id}' tiene un tipo inválido ('${field.type}'). Permitidos: ${VALID_TYPES.join(', ')}`);
        }

        // ¿Tiene orden?
        if (field.order === undefined || typeof field.order !== 'number') {
            throw new Error(`El campo '${field.id}' debe tener un 'order' numérico`);
        }
    });
    
    return true; // Si llega aquí, todo está bien
};

module.exports = { validateOrderStructure };