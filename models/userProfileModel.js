const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    token: { type: String, required: false },
    nik_name: { type: String, required: true },
    city: { type: String, required: true },
    profile_photo: { type: String, required: true },
    nationality: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true }
})

module.exports = mongoose.model('UserProfile', userProfileSchema);