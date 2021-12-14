import express from "express";
import morgan from 'morgan';
import pkg from '../package.json';

import {createRoles} from './libs/initialSetup'

import productRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';

const app = express();
createRoles();

app.set('pkg', pkg);
app.use(morgan('dev')); // Es para el log de la consola
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

export default app;