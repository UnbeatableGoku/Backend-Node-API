const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
  enable: { type: String }, // doubt to ask
  fb_id: { type: String },
  google_id: { type: String },
  twitter_id: { type: String },
  apple_id: { type: String },
  device_type: { type: String }
});

module.exports = mongoose.model('User', userSchema);
