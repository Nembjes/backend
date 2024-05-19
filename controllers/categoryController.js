import Category from '../models/category.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(categories);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findAll({
            where: { id: req.params.id },
        });
        res.json(category[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        res.json({ message: 'Category Created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        await Category.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Category Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await Category.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Category Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
