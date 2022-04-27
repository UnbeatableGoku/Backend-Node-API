const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const bankRoutes = require('./routes/bankRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Connect to MongoDB database
mongoose
    .connect('mongodb://localhost:27017/kartblock', { useNewUrlParser: true })
    .then(() => {
        const app = express();
        app.use(express.json());

        app.use('/api', userRoutes);
        app.use('/api/bank', bankRoutes);
        app.use('/api/category', categoryRoutes);
        app.use('/auth', authRoutes);

        app.listen(5000, () => {
            console.log('Server has started!');
        });
    })
    .catch((err) => console.log('Failed to start', err));