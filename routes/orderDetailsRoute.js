// routes.js

import express from 'express';
import { createOrderDetail } from '../controllers/orderDetailsController.js';

const orderDetailsRouter = express.Router();

orderDetailsRouter.post('/', createOrderDetail);

export default orderDetailsRouter;
