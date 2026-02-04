const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

// Definir los endpoints
router.post('/', ordersController.createOrder); // Crear orden
router.get('/', ordersController.getOrders);    // Ver órdenes

module.exports = router;