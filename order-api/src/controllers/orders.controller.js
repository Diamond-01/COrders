const ordersService = require('../services/orders.service');

const createOrder = (req, res) => {
    try {
        const newOrder = ordersService.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ 
            error: "INVALID_JSON",
            message: error.message
        });
    }
};

const getOrders = (req, res) => {
    try {
        const orders = ordersService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
};


const getOrderById = (req, res) => {
    try {
        const { id } = req.params; 
        const order = ordersService.getOrderById(id);

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
};

module.exports = { createOrder, getOrders, getOrderById };