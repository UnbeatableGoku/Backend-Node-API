const mongoose = require('mongoose');

const bankCardSchema = new mongoose.Schema(
    {
        bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
        card_name: { type: String, required: true },
        card_image: { type: String, required: true },
        card_type: { type: String, required: true },
        annual_charges: { type: String, required: true },
        fx_rate: { type: String, required: true },
        monthly_fees: { type: String, required: true },
        minimum_salary: { type: String, required: true },
        balance_transfer: { type: String, required: true },
        other_description: { type: String },
        is_active: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('BankCard', bankCardSchema);
