const crypto = require('crypto');
const { validateOrderStructure } = require('../utils/validation.js');
const OrderModel = require('../models/order.model');

const createOrder = async (orderData) => {
    // 1. Validar estructura estricta
    validateOrderStructure(orderData); 

    // 2. Preparar datos según corrección
    const newOrder = {
        id: crypto.randomUUID(),
        title: orderData.title,
        fields: orderData.fields, 
        createdAt: new Date().toISOString()
    };

    // 3. Guardar
    return await OrderModel.save(newOrder);
};

const getAllOrders = async () => {
    return await OrderModel.findAll();
};

const getOrderById = async (id) => {
    return await OrderModel.findById(id);
};

module.exports = { createOrder, getAllOrders, getOrderById };