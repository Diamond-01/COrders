const crypto = require('crypto');
const { validateOrderStructure } = require('../utils/validation.js');
const OrderModel = require('../models/order.model');

const createOrder = async (data) => {

    // Validaciones mínimas backend
    if (!data.name || data.name.trim() === '') {
        throw new Error('El nombre de la plantilla es obligatorio');
    }

    if (!Array.isArray(data.fields)) {
        throw new Error('Los fields son obligatorios y deben ser un arreglo');
    }

    const newOrder = {
        id: data.id || crypto.randomUUID(),
        title: data.name,
        description: data.description || '',
        schema: data, // guardamos TODO el contrato completo
        createdAt: data.createdAt || new Date().toISOString()
    };

    return await OrderModel.save(newOrder);
};

const updateOrder = async (id, data) => {

    if (!data.name || data.name.trim() === '') {
        throw new Error('El nombre de la plantilla es obligatorio');
    }

    if (!Array.isArray(data.fields)) {
        throw new Error('Los fields son obligatorios y deben ser un arreglo');
    }

    const updatedOrder = {
        id,
        title: data.name,
        description: data.description || '',
        schema: data,
        updatedAt: new Date().toISOString()
    };

    return await OrderModel.update(id, updatedOrder);
};

const getAllOrders = async () => {
    return await OrderModel.findAll();
};

const getOrderById = async (id) => {
    return await OrderModel.findById(id);
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder };