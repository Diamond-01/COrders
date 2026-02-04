const crypto = require('crypto'); // Necesario para generar IDs
const { validateOrderStructure } = require('../utils/validation.js');

// Base de datos temporal
let ordersDatabase = [];

const createOrder = (orderData) => {

    validateOrderStructure(orderData); 
    // ---------------------------------

    const newOrder = {
        id: crypto.randomUUID(),
        title: orderData.title,
        fields: orderData.fields,
        createdAt: new Date().toISOString()
    };

    ordersDatabase.push(newOrder);
    return newOrder;
};

const getAllOrders = () => {
    return ordersDatabase;
};

module.exports = { createOrder, getAllOrders };