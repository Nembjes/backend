import RateprodCustomer from '../models/rateprodcustomer.js';
import Rate from '../models/rate.js';
import Products from '../models/products.js';
import Users from '../models/users.js';

export const getAllRates = async (req, res) => {
    try {
        const rates = await RateprodCustomer.findAll({
            include: ['products', 'users', 'rate'],
            order: [['createdAt', 'DESC']],
        });
        res.json(rates);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getRateByProductId = async (req, res) => {
    try {
        console.log('Inside getRateByProductId controller');
        const rates = await RateprodCustomer.findAll({
            include: ['products', 'users', 'rate'],
            where: { prod_code: req.params.id },
        });
        res.json(rates); // Возвращает все рейтинги, а не только первый
    } catch (error) {
        console.error(error);
        res.json({ message: error.message });
    }
};

export const createOrUpdateRate = async (req, res) => {
    try {
        const { user_id, prod_code, rate_id } = req.body;
        // Проверяем, существует ли уже оценка от данного пользователя для данного продукта
        const existingRate = await RateprodCustomer.findOne({ where: { user_id, prod_code } });
        if (existingRate) {
            // Если оценка уже существует, обновляем ее
            await RateprodCustomer.update({ rate_id }, { where: { user_id, prod_code } });
            res.json({ message: 'Rate Updated' });
        } else {
            // Если оценка не существует, создаем новую
            await RateprodCustomer.create({ user_id, prod_code, rate_id });
            res.json({ message: 'Rate Created' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRate = async (req, res) => {
    try {
        await RateprodCustomer.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Rate Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteRate = async (req, res) => {
    try {
        await RateprodCustomer.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Rate Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
