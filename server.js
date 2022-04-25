const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CategoryDB', () => {
    console.log("Database Done!!");
});

const app = require('./app')

app.listen(3000, () => {
    console.log("Connected to localhost !!");
})