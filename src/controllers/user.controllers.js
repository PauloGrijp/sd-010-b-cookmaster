const { createUser } = require('../services/user.services');

const newUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const create = await createUser(name, email, password);
    return res.status(201).json(create);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newUser,
};