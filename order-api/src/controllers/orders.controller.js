const ordersService = require('../services/orders.service');

const createOrder = async (req, res) => { 
    try {
        const newOrder = await ordersService.createOrder(req.body); 
        res.status(201).json(newOrder);
    } catch (error) {
        // Diferenciamos errores de validación vs errores de base de datos
        if (error.message.includes('obligatorio') || error.message.includes('inválido')) {
            res.status(400).json({ error: "INVALID_JSON", message: error.message });
        } else {
            console.error(error); 
            res.status(500).json({ error: "DB_ERROR", message: "Error al guardar en base de datos" });
        }
    }
};

const getOrders = async (req, res) => { 
    try {
        const orders = await ordersService.getAllOrders(); 
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
};

const getOrderById = async (req, res) => { 
    try {
        const { id } = req.params;
        const order = await ordersService.getOrderById(id); 

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
};

module.exports = { createOrder, getOrders, getOrderById };