const User = require('../models/userProfileModel');

exports.getAllUserProfile = async(req, res) => {
    try {
        const allUserProfile = await User.find();
        if (allUserProfile.length !== 0) {
            return res.status(200).json({
                success: true,
                message: 'All UserProfiles',
                statusCode: 200,
                data: allUserProfile
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'No data found',
                statusCode: 400
            });
        }
    } catch (error) {
        res.json({
            success: 'fail',
            message: error.message
        })
    }
};

exports.addUserProfile = async(req, res) => {
    try {
        const {
            token,
            nik_name,
            city,
            profile_photo,
            nationality,
            date_of_birth,
            email,
            gender,
        } = req.body;

        if (!(token &&
                nik_name &&
                city &&
                profile_photo &&
                nationality &&
                date_of_birth &&
                email &&
                gender.toString())) {
            return res.status(400).json({
                success: false,
                message: 'all fields required',
                statusCode: 400
            });
        }

        const newUserProfile = await User({
            token,
            nik_name,
            city,
            profile_photo,
            nationality,
            date_of_birth,
            email,
            gender,
        });
        newUserProfile.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully added new User Profile',
            statusCode: 200,
            data: newUserProfile
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

exports.updateUserProfile = async(req, res) => {
    try {
        const updateUserProfile = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        return res.status(200).json({
            success: true,
            message: 'Successfully updated',
            statusCode: 200,
            data: updateUserProfile
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};