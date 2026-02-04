const crypto = require('crypto');
const { validateOrderStructure } = require('../utils/validation.js');
const OrderModel = require('../models/order.model');

const createOrder = async (orderData) => { 
    validateOrderStructure(orderData); 


    const newOrder = {
        id: crypto.randomUUID(),
        title: orderData.title,
        fields: orderData.fields,
        createdAt: new Date().toISOString()
    };

    // Guardar en BD (Esperamos la respuesta)
    return await OrderModel.save(newOrder);
};

const getAllOrders = async () => { 
    return await OrderModel.findAll();
};

const getOrderById = async (id) => { 
    return await OrderModel.findById(id);
};

module.exports = { createOrder, getAllOrders, getOrderById };