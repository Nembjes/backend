// controllers/cityController.js

import Cities from '../models/cities.js';

// Получить все города
export const getAllCities = async (req, res) => {
    try {
        const cities = await Cities.findAll();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Получить город по ID
export const getCityById = async (req, res) => {
    const { id } = req.params;
    try {
        const city = await Cities.findByPk(id);
        if (city) {
            res.status(200).json(city);
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Создать новый город
export const createCity = async (req, res) => {
    const { name } = req.body;
    try {
        const newCity = await Cities.create({ name });
        res.status(201).json(newCity);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Обновить информацию о городе
export const updateCity = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const city = await Cities.findByPk(id);
        if (city) {
            await city.update({ name });
            res.status(200).json(city);
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Удалить город
export const deleteCity = async (req, res) => {
    const { id } = req.params;
    try {
        const city = await Cities.findByPk(id);
        if (city) {
            await city.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
