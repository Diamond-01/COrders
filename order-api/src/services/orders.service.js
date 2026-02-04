// Variable temporal para guardar órdenes (mientras conectamos PostgreSQL)
let ordersDatabase = [];

const createOrder = (orderData) => {
    // 1. Validar contrato JSON básico [cite: 206]
    if (!orderData.title) {
        throw new Error("El campo 'title' es obligatorio");
    }
    if (!Array.isArray(orderData.fields)) {
        throw new Error("El campo 'fields' debe ser un array");
    }

    // 2. Crear la orden con datos de servidor [cite: 194]
    const newOrder = {
        id: crypto.randomUUID(), // Genera un ID único
        title: orderData.title,
        fields: orderData.fields, // Guardamos los campos tal cual [cite: 226]
        createdAt: new Date().toISOString()
    };

    // 3. Simular guardado
    ordersDatabase.push(newOrder);
    return newOrder;
};

const getAllOrders = () => {
    return ordersDatabase;
};

module.exports = { createOrder, getAllOrders };
