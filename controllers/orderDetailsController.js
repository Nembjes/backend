import Orderdetails from '../models/orderdetails.js';

export const createOrderDetail = async (req, res) => {
    try {
        await Orderdetails.create(req.body);
        res.json({ message: 'Order Detail Created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};