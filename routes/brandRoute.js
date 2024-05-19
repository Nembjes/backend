import express from 'express';
import {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
} from '../controllers/brandController.js';

const brandrouter = express.Router();

brandrouter.get('/', getAllBrands);
brandrouter.get('/:id', getBrandById);
brandrouter.post('/', createBrand);
brandrouter.put('/:id', updateBrand);
brandrouter.delete('/:id', deleteBrand);

export default brandrouter;
