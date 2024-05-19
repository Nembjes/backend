// paymentsRoutes.js

import express from 'express';
import {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
} from '../controllers/paymentsController.js';

const paymentsrouter = express.Router();

paymentsrouter.get('/', getAllPayments);
paymentsrouter.get('/:id', getPaymentById);
paymentsrouter.post('/', createPayment);
paymentsrouter.put('/:id', updatePayment);
paymentsrouter.delete('/:id', deletePayment);

export default paymentsrouter;
