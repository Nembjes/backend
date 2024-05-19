import express from 'express';
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';

const categoryrouter = express.Router();

categoryrouter.get('/', getAllCategories);
categoryrouter.get('/:id', getCategoryById);
categoryrouter.post('/', createCategory);
categoryrouter.put('/:id', updateCategory);
categoryrouter.delete('/:id', deleteCategory);

export default categoryrouter;
