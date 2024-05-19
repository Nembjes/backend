import Brand from '../models/brand.js';

export const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(brands);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findAll({
            where: { id: req.params.id },
        });
        res.json(brand[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createBrand = async (req, res) => {
    try {
        await Brand.create(req.body);
        res.json({ message: 'Brand Created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateBrand = async (req, res) => {
    try {
        await Brand.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Brand Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        await Brand.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Brand Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
