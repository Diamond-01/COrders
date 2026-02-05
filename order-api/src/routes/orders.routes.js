const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

router.post('/', ordersController.createOrder); 
router.get('/', ordersController.getOrders);

// Los dos puntos : indican que "id" es variable
router.get('/:id', ordersController.getOrderById); 

module.exports = router;