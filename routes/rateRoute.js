import express from 'express';
import {
   getAllRates,
   getRateByProductId,
   createOrUpdateRate,
   updateRate,
   deleteRate,
} from '../controllers/rateController.js';

const raterouter = express.Router();

raterouter.get('/', getAllRates);
raterouter.get('/:id', getRateByProductId);
raterouter.post('/', createOrUpdateRate);
raterouter.put('/:id', updateRate);
raterouter.delete('/:id', deleteRate);

export default raterouter;
