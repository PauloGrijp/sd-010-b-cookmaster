const userModel = require('../models/user');

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.registerUser(name, email, password);
    if (user) { return res.status(201).json(user); }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ops.. Something went wrong', error: err.message });
  }
};