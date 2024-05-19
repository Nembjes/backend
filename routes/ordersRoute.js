// orderRoutes.js

import express from 'express';
import {
    getAllOrders,
    getUserPurchaseHistory,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
} from '../controllers/ordersController.js';

const ordersrouter = express.Router();

ordersrouter.get('/', getAllOrders);
ordersrouter.get('/:id', getOrderById);
ordersrouter.post('/', createOrder);
ordersrouter.put('/:id', updateOrder);
ordersrouter.delete('/:id', deleteOrder);

ordersrouter.get('/purchasehistory/:email', getUserPurchaseHistory);

ordersrouter.get('/:id/orderdetails', getOrderDetailsByOrderId);
ordersrouter.post('/:id/orderdetails', createOrderDetail);
ordersrouter.put('/:id/orderdetails/:detailId', updateOrderDetail);
ordersrouter.delete('/:id/orderdetails/:detailId', deleteOrderDetail);

export default ordersrouter;
