// customersController.js

import Customers from '../models/customers.js';
import Cities from '../models/cities.js';
import Users from '../models/users.js';

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customers.findAll({
            include: ['cities', 'users'],
            order: [['createdAt', 'DESC']],
        });
        res.json(customers);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const customer = await Customers.findAll({
            include: ['cities', 'users'],
            where: { id: req.params.id },
        });
        res.json(customer[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createCustomer = async (req, res) => {
    try {
        const createdCustomer = await Customers.create(req.body);
        res.json(createdCustomer); // Возвращаем созданного кастомера целиком
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        await Customers.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Customer Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        await Customers.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Customer Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
