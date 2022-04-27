const Bank = require('../models/bankModel');

exports.getAllBanks = async (req, res) => {
    try {
        const banks = await Bank.find({}).limit(10);
        return res.status(200).json({
            success: true,
            message: 'Banks upto 10',
            statusCode: 200,
            data: banks
        });
    } catch (error) {}
};

exports.addBank = async (req, res) => {
    try {
        const {
            bank_ifsc_code,
            bank_name,
            bank_logo,
            bank_city,
            bank_country,
            bank_state,
            bank_full_address,
            other_description,
            is_active,
            added_by
        } = req.body;

        const oldBank = await Bank.findOne({ bank_ifsc_code }); // checks bank with the given ifsc code
        if (oldBank)
            return res.status(400).json({
                success: false,
                message: 'Bank with ' + bank_ifsc_code + ' already exists',
                statusCode: 400
            });

        if (
            // checks if any fields are missing
            !(
                bank_ifsc_code &&
                bank_name &&
                bank_logo &&
                bank_city &&
                bank_country &&
                bank_state &&
                bank_full_address &&
                is_active.toString() &&
                added_by
            )
        )
            return res.status(400).json({
                success: false,
                message: 'Some fields are missing',
                statusCode: 400
            });

        const bank = await Bank({
            bank_ifsc_code,
            bank_name,
            bank_logo,
            bank_city,
            bank_country,
            bank_state,
            bank_full_address,
            other_description,
            is_active,
            added_by
        });
        bank.save();

        return res.status(200).json({
            success: true,
            message: 'Bank created successfully',
            statusCode: 200,
            data: bank
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400
        });
    }
};

exports.getBank = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);
        if (bank)
            return res.status(200).json({
                success: true,
                message: 'Bank found',
                statusCode: 200,
                data: bank
            });
        else {
            return res.status(404).json({
                success: false,
                message: 'Bank not found',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            statusCode: 404
        });
    }
};

exports.updateBank = async (req, res) => {
    try {
        const updatedBank = await Bank.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        return res.status(200).json({
            success: true,
            message: 'Bank ' + updatedBank.bank_name + ' successfully updated',
            statusCode: 400,
            data: updatedBank
        });
    } catch (error) {
        res.json({
            message: error.message
        });
    }
};

exports.deleteBank = async (req, res) => {
    try {
        const deletedBank = await Bank.findByIdAndDelete(req.params.id);
        if (deletedBank)
            return res.status(200).json({
                success: true,
                message: 'Bank' + deletedBank.bank_name + 'successfully deleted',
                statusCode: 400,
                data: deletedBank
            });
        else {
            return res.json({
                success: false,
                message: 'No Bank exists',
                statusCode: 400
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400
        });
    }
};
