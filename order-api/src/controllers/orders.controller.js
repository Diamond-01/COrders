const ordersService = require('../services/orders.service');

const createOrder = async (req, res) => { 
    try {
        console.log('BODY RECIBIDO:', req.body);

        const newOrder = await ordersService.createOrder(req.body); 
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('ERROR REAL:', error.message);

        if (error.message.includes('obligatorio') || error.message.includes('inválido')) {
            res.status(400).json({ error: "INVALID_JSON", message: error.message });
        } else {
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

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;

        console.log('ID A ACTUALIZAR:', id);
        console.log('BODY RECIBIDO:', req.body);

        const updatedOrder = await ordersService.updateOrder(id, req.body);

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json(updatedOrder);

    } catch (error) {
        console.error('ERROR REAL:', error.message);

        if (error.message.includes('obligatorio') || error.message.includes('inválido')) {
            res.status(400).json({ error: "INVALID_JSON", message: error.message });
        } else {
            res.status(500).json({ error: "DB_ERROR", message: "Error al actualizar en base de datos" });
        }
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await ordersService.deleteOrder(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json({ message: 'Orden eliminada correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "DB_ERROR", message: "Error al eliminar" });
    }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };