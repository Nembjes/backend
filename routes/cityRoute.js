// routers/cityRouter.js

import express from 'express';
import {
    getAllCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity,
} from '../controllers/cityController.js';

const cityRouter = express.Router();

cityRouter.get('/', getAllCities);
cityRouter.get('/:id', getCityById);
cityRouter.post('/', createCity);
cityRouter.put('/:id', updateCity);
cityRouter.delete('/:id', deleteCity);

export default cityRouter;
