const Card = require('../models/bankModel')


exports.getCard = async(req, res) => {
    try {
        const card = await Card.findById(req.params.id).populate('bank')
        return res.status(200).json({
            success: true,
            message: 'cards is here',
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

}


exports.addCard = async(req, res) => {
    try {
        const { card_name, bank } = req.body
        const card = await Card({
            card_name,
            bank
        })
        card.save()
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
}