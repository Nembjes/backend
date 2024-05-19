// orderController.js

import Orders from '../models/orders.js';
import Customers from '../models/customers.js';
import Status from '../models/status.js';
import Orderdetails from '../models/orderdetails.js';
import Products from '../models/products.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            include: ['customers', 'status'],
            order: [['createdAt', 'DESC']],
        });
        res.json(orders);
    } catch (error) {
        res.json({ message: error.message });
    }
};


export const getUserPurchaseHistory = async (req, res) => {
    try {
        const customers = await Customers.findAll({ where: { email: req.params.email } });

        if (!customers || customers.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const customerIds = customers.map(customer => customer.id);

        const orders = await Orders.findAll({
            include: [
                {
                    model: Orderdetails,
                    as: 'orderdetails',
                    include: [{ model: Products, as: 'products' }], // Используем правильный псевдоним 'products' для модели Products
                },
            ],
            where: { customer_id: customerIds },
            order: [['createdAt', 'DESC']],
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







export const getOrderById = async (req, res) => {
    try {
        const order = await Orders.findAll({
            include: ['customers', 'status'],
            where: { id: req.params.id },
        });
        res.json(order[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        await Orders.create(req.body);
        res.json({ message: 'Order Created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};


export const updateOrder = async (req, res) => {
    try {
        await Orders.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Order Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        await Orders.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Order Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const orderDetails = await Orderdetails.findAll({
            include: ['products', 'orders'],
            where: { orderNum: req.params.id },
            order: [['createdAt', 'DESC']],
        });
        res.json(orderDetails);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createOrderDetail = async (req, res) => {
    try {
        await Orderdetails.create(req.body);
        res.json({ message: 'Order Detail Created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateOrderDetail = async (req, res) => {
    try {
        await Orderdetails.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Order Detail Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteOrderDetail = async (req, res) => {
    try {
        await Orderdetails.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Order Detail Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
