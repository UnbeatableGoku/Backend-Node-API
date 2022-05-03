const User = require('../models/user');
const { imageUploader } = require('../utils/imageUploader');

// get all users
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            message: 'all users',
            statusCode: 200,
            data: users
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400
        });
    }
};

// get all users
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status('Error', error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const preUser = await User.findById(req.params.id);

        const { profile_photo } = req.body;

        let imagePath = '' || preUser.profile_photo;

        if (req.body.profile_photo) {
            imagePath = await imageUploader('profile', preUser.email, profile_photo);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { ...req.body, profile_photo: imagePath },
            { new: true }
        );

        return res.status(200).send({
            message: 'Updated successfully',
            statusCode: 200,
            success: true,
            data: updatedUser
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message,
            statusCode: 400,
            success: false
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(deletedUser);
    } catch (error) {
        res.json(error);
    }
};
