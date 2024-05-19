import express from 'express';
import {
    getCommentsByProductId,
    createComment,
    updateComment,
    deleteComment,
} from '../controllers/commentsController.js';

const commentsrouter = express.Router();

commentsrouter.get('/:id', getCommentsByProductId);
commentsrouter.post('/', createComment);
commentsrouter.patch('/:id', updateComment);
commentsrouter.delete('/:id', deleteComment);

export default commentsrouter;
