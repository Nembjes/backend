import express from 'express';
import {
    registerUser,
    loginUser,
    getMe,
    getUsers,
    updateUser,
} from '../controllers/usersController.js';
import { checkAuth } from '../validations/checkAuth.js';

const usersrouter = express.Router();

usersrouter.post('/register', registerUser);
usersrouter.post('/login', loginUser);
usersrouter.get('/me', checkAuth, getMe);
usersrouter.get('/users', getUsers);
usersrouter.put('/update', checkAuth, updateUser);

export default usersrouter;
