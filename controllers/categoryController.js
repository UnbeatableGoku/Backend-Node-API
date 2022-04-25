const category = require('../models/categorySchema')

exports.getAllCategory = async(req, res) => {
    try {
        const allCategory = await category.find()
        res.json({
            allCategory
        })
    } catch (err) {
        res.json({
            status: 'fail',
        })
    }
}

exports.postCategory = async(req, res) => {
    try {
        const newCategory = await category.create(req.body)
        res.json({
            newCategory
        })
    } catch (error) {
        res.json({
            status: 'fail'
        });
    }
}
exports.updateCategory = async(req, res) => {
    try {
        const updateCategory = await category.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.json({
            newData: {
                updateCategory
            }
        })

    } catch (error) {
        res.json({
            status: 'fail',
            error
        });
    }
}
exports.deleteCategory = async(req, res) => {
    try {
        const deleteCategory = await category.findByIdAndDelete(req.params.id)
        res.json({
            status: "pass"
        })
    } catch (error) {
        res.json({
            status: 'fail',
            error
        });
    }
}