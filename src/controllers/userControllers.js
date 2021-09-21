const userValidations = require('../services/userValidations');

const createUser = async (req, res) => {
  const create = await userValidations.createUserValidations();
  res.status(200).json(create);
};

module.exports = {
  createUser,
};
