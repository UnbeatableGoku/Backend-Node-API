const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const bankRoutes = require('./routes/bankRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bankCardRoutes = require('./routes/bankCardRoutes');

// Connect to MongoDB database
mongoose
    .connect('mongodb://localhost:27017/kartblock', { useNewUrlParser: true })
    .then(() => {
        const app = express();
        // app.use(express.json());

        app.use(
            bodyParser.json({
                limit: '50mb'
            })
        );

        app.use(
            bodyParser.urlencoded({
                limit: '50mb',
                parameterLimit: 100000,
                extended: true
            })
        );

        app.use('/api/user', userRoutes);
        app.use('/api/bank', bankRoutes);
        app.use('/api/card', bankCardRoutes);
        app.use('/api/category', categoryRoutes);
        app.use('/auth', authRoutes);

        app.listen(5000, () => {
            console.log('Server has started!');
        });
    })
    .catch((err) => console.log('Failed to start', err));
