const Category = require('../models/categoryModel');
const { imageUploader } = require('../utils/imageUploader');

exports.getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();
        if (allCategory.length !== 0) {
            return res.status(200).json({
                success: true,
                message: 'All categories',
                statusCode: 200,
                data: allCategory
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'No categories found',
                statusCode: 400
            });
        }
    } catch (error) {
        res.json({
            success: 'fail',
            message: error.message
        });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const { title, image, is_active, other_description } = req.body;

        if (!(title && image && is_active.toString())) {
            return res.status(400).json({
                success: false,
                message: 'all fields required',
                statusCode: 400
            });
        }

        let imagePath = await imageUploader('category', title, image);

        const newCategory = await Category({
            title,
            image: imagePath,
            is_active,
            other_description
        });
        newCategory.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully added new category',
            statusCode: 200,
            data: newCategory
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        return res.status(200).json({
            success: true,
            message: 'Successfully updated ' + updateCategory.title + ' category',
            statusCode: 200,
            data: updateCategory
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
exports.deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted ' + deleteCategory.title + ' category',
            statusCode: 200,
            data: deleteCategory
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
