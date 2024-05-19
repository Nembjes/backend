import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/database.js';

import usersRoute from './routes/usersRoute.js';
import productsRoute from './routes/productsRoute.js';
import blogRoute from './routes/blogRoute.js';
import brandRoute from './routes/brandRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import commentsRoute from './routes/commentsRoute.js';
import customersRoute from './routes/customersRoute.js';
import ordersRoute from './routes/ordersRoute.js';
import paymentsRoute from './routes/paymentsRoute.js';
import rateRoute from './routes/rateRoute.js';
import cityRoute from './routes/cityRoute.js';
import orderDetailsRoute from './routes/orderDetailsRoute.js';
import imageRoute from './routes/imageRoute.js';

const app = express();

try {
   await db.authenticate();
   console.log('Database connected...');
} catch (error) {
   console.error('Connection error:', error);
}

// Настройка CORS для доступа с вашего домена
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(cookieParser());
app.use(express.json());

app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/blog', blogRoute);
app.use('/brand', brandRoute);
app.use('/category', categoryRoute);
app.use('/comments', commentsRoute);
app.use('/customers', customersRoute);
app.use('/orders', ordersRoute);
app.use('/orderdetails', orderDetailsRoute);
app.use('/payments', paymentsRoute);
app.use('/rate', rateRoute);
app.use('/city', cityRoute);
app.use('/image', imageRoute);

// Настройка порта и хоста для прослушивания
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, (error) => {
   error
      ? console.log(error)
      : console.log(`Server OK. listening port ${PORT}`);
});
