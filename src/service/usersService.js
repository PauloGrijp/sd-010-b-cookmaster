const userModel = require('../model/userModel');
const {
  getByEmail,
  getById,
} = require('../model/userModel');

const getEmail = async (email) => {
  const findedEmail = await getByEmail(email);
  return findedEmail;
};

const createUser = async (user) => {
  const insertedId = await userModel.createUser(user);
  const { _id, name, email, role } = await getById(insertedId);
  const userCreated = { _id, name, email };
  if (role) {
    userCreated.role = role;
  }
  return userCreated;
};

const checkLoginUser = async (email, password) => {
  const checkedUser = await userModel.getByEmailAndPassword(email, password);
  return checkedUser;
};

module.exports = {
  getEmail,
  createUser,
  checkLoginUser,
};
