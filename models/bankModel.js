const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema(
    {
        bank_name: { type: String, required: true },
        bank_ifsc_code: { type: String, required: true },
        bank_logo: { type: String, required: true },
        bank_city: { type: String, required: true },
        bank_country: { type: String, required: true },
        bank_state: { type: String, required: true },
        bank_full_address: { type: String, required: true },
        other_description: { type: String },
        is_active: { type: Boolean, required: true },
        added_by: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Bank', bankSchema);
