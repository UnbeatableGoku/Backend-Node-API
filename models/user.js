const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    token: { type: String },
    name: { type: String },
    email: { type: String, required: true },
    nik_name: { type: String },
    city: { type: String },
    profile_photo: { type: String },
    nationality: { type: String },
    date_of_birth: { type: String },
    gender: { type: String }
});

module.exports = mongoose.model('User', userSchema);
