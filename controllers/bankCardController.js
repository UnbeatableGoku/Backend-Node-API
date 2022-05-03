const Card = require('../models/bankCardModel');
const { imageUploader } = require('../utils/imageUploader');

exports.getCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id).populate('bank_id', 'bank_name');
        if (card)
            return res.status(200).json({
                success: true,
                message: 'Card found',
                statusCode: 200,
                data: card
            });
        else {
            return res.status(400).json({
                success: false,
                message: 'Card Not found',
                statusCode: 400
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400
        });
    }
};

exports.addCard = async (req, res) => {
    try {
        const { card_name, card_image } = req.body;

        let imagePath = await imageUploader('bankcard', card_name, card_image);

        const card = await Card({ ...req.body, card_image: imagePath });

        card.save();
        return res.status(200).json({
            success: true,
            message: 'BankCard created successfully',
            statusCode: 200,
            data: card
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400
        });
    }
};

exports.updateCard = async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedCard)
            res.status(400).json({
                success: false
            });
        return res.status(200).json({
            success: true,
            message: 'Successfully updated' + updatedCard.card_name,
            statusCode: 200,
            data: updatedCard
        });
    } catch (error) {
        return res.json({
            message: error.message
        });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const deletedCard = await Card.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted',
            statusCode: 200
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400
        });
    }
};
