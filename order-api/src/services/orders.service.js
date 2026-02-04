const crypto = require('crypto');
const { validateOrderStructure } = require('../utils/validation.js');

let ordersDatabase = [];

const createOrder = (orderData) => {
    validateOrderStructure(orderData); 

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

const getOrderById = (id) => {
    const order = ordersDatabase.find(o => o.id === id);
    return order || null; 
};

module.exports = { createOrder, getAllOrders, getOrderById };