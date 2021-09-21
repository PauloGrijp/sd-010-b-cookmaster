const Models = require('../models');

const returnUser = (user) => {
  const { password, ...newUser } = user; // https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object

  return newUser;
};

const create = async (user) => {
  const search = await Models.user.findByEmail(user.email);

  if (search) return false;

  const userCreate = await Models.user.create({ ...user, role: 'user' });

  return returnUser(userCreate);
};

const login = async (user) => {
  const search = await Models.user.findByEmail(user.email);

  if (!search || search.password !== user.password) return false;

  return true;
};

module.exports = { create, login };
