const ordersService = require('../services/orders.service');

const createOrder = (req, res) => {
    try {
        const newOrder = ordersService.createOrder(req.body);
        res.status(201).json(newOrder); // 201 = Creado exitosamente
    } catch (error) {
        res.status(400).json({ // 400 = Error del cliente (JSON inválido) [cite: 253]
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

module.exports = { createOrder, getOrders };