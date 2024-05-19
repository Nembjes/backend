import Users from '../models/users.js';
import Roles from '../models/roles.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { email, username, password, confPassword } = req.body;
        
        // Проверка, существует ли пользователь с таким email
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email is already registered' });
        }

        if (password !== confPassword) {
            return res.status(400).json({ msg: 'Password and Confirm Password do not match' });
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await Users.create({
            email: email,
            username: username,
            password: hashPassword,
        }).then((response) => {
            const userId = response.id;
            const token = jwt.sign({ id: userId }, 'secretword123', { expiresIn: '30d' });
            res.json({ userId, token });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


export const loginUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(404).json({ msg: 'Email not found' });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPass) {
            return res.status(400).json({ msg: 'Wrong Password' });
        }

        const userId = user.id;
        const username = user.username;

        const token = jwt.sign({ userId, username }, 'secretword123', { expiresIn: '30d' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ userId, username, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                id: req.userId,
            },
            include: [
                {
                    model: Roles,
                    as: 'roles',
                    attributes: ['name'], // Укажите нужные атрибуты роли
                },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = {
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.roles ? user.roles.name : null, // Проверяем, что связанная роль существует
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        res.json(userData);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(403).json({ message: 'No access to the query' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'username', 'email', 'role'],
        });
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({
            where: {
                id: req.userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) {
            user.username = username;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            user.password = hashPassword;
        }

        await user.save();

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            'secretword123',
            { expiresIn: '30d' }
        );

        res.json({ userId: user.id, username: user.username, token });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
