const User = require('../models/user');

// get all users
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status('Error', error);
  }
};

// new user registration
exports.newUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({
      name: name,
      email: email
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.send({ messsage: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
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
