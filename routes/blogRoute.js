import express from 'express';
import {
    getAllBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
} from '../controllers/blogController.js';

const blogrouter = express.Router();

blogrouter.get('/', getAllBlogPosts);
blogrouter.get('/:id', getBlogPostById);
blogrouter.post('/', createBlogPost);
blogrouter.put('/:id', updateBlogPost);
blogrouter.delete('/:id', deleteBlogPost);

export default blogrouter;
