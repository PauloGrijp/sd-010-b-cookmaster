const { createUser } = require('../services/user.services');

const newUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const create = await createUser(name, email);
    return res.status(201).json(create);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newUser,
};