import Comments from '../models/comments.js';
import Products from '../models/products.js';
import Users from '../models/users.js';

export const getCommentsByProductId = async (req, res) => {
    try {
        const comments = await Comments.findAll({
            include: ['products', 'users'],
            where: { prod_code: req.params.id },
            order: [['createdAt', 'DESC']],
        });
        res.json(comments);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        await Comments.create(req.body);
        res.json({ message: 'Comment Created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        await Comments.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Comment Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        await Comments.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Comment Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
