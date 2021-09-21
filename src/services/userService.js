const UserModel = require('../models/usersModel');
const UserSchema = require('../schemas/UserSchema');

const create = async (user) => {
  const validations = UserSchema.validate(user.name);

  if (validations.code) return validations;

  const newUser = await UserModel.create(user);
  return newUser;
};

module.exports = {
  create,
};
