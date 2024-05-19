// paymentsController.js

import Payments from '../models/payments.js';
import Customers from '../models/customers.js';

export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payments.findAll({
            include: ['customers'],
            order: [['createdAt', 'DESC']],
        });
        res.json(payments);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getPaymentById = async (req, res) => {
    try {
        const payment = await Payments.findAll({
            include: ['customers'],
            where: { id: req.params.id },
        });
        res.json(payment[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createPayment = async (req, res) => {
    try {
        await Payments.create(req.body);
        res.json({ message: 'Payment Created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updatePayment = async (req, res) => {
    try {
        await Payments.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Payment Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deletePayment = async (req, res) => {
    try {
        await Payments.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Payment Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
