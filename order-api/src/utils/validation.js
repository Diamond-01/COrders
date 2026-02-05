const VALID_TYPES = ['text', 'number', 'date', 'select'];

const validateOrderStructure = (orderData) => {
    // 1. Validar el título
    if (!orderData.title || typeof orderData.title !== 'string') {
        throw new Error("El campo 'title' es obligatorio y debe ser texto");
    }

    // 2. Validar array fields
    if (!Array.isArray(orderData.fields)) {
        throw new Error("El campo 'fields' es obligatorio y debe ser un array");
    }

    // 3. Validar cada campo 
    orderData.fields.forEach((field, index) => {
        // IDs y Tipos
        if (!field.id) throw new Error(`Campo en índice ${index} sin ID`);
        if (!field.type || !VALID_TYPES.includes(field.type)) {
            throw new Error(`Campo '${field.id}' tiene tipo inválido: ${field.type}`);
        }

        // Orden
        if (typeof field.order !== 'number') {
            throw new Error(`Campo '${field.id}' debe tener 'order' numérico`);
        }

        // PROPS (Aquí estaba el error antes)
        if (!field.props || typeof field.props !== 'object') {
            throw new Error(`Campo '${field.id}' debe tener un objeto 'props'`);
        }

        // Label dentro de props
        if (!field.props.label || field.props.label.trim() === '') {
            throw new Error(`Campo '${field.id}' debe tener 'props.label' no vacío`);
        }
    });
    
    return true;
};

module.exports = { validateOrderStructure };