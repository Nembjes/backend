import express from 'express';
import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from '../controllers/customersController.js';

const customersRouter = express.Router();

customersRouter.get('/', getAllCustomers);
customersRouter.get('/:id', getCustomerById);
customersRouter.post('/', createCustomer);
customersRouter.put('/:id', updateCustomer);
customersRouter.delete('/:id', deleteCustomer);

export default customersRouter;
