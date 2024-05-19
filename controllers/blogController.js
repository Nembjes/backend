import Blog from '../models/blog.js';

export const getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await Blog.findAll({
            include: ['users'],
            order: [['createdAt', 'DESC']],
        });
        res.json(blogPosts);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getBlogPostById = async (req, res) => {
    try {
        const blogPost = await Blog.findAll({
            include: ['users'],
            where: { id: req.params.id },
        });
        res.json(blogPost[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createBlogPost = async (req, res) => {
    try {
        await Blog.create(req.body);
        res.json({ message: 'Blog Post Created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateBlogPost = async (req, res) => {
    try {
        await Blog.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: 'Blog Post Updated' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteBlogPost = async (req, res) => {
    try {
        await Blog.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Blog Post Deleted' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
