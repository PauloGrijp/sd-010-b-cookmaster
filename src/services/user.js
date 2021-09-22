const Models = require('../models');

const returnUserCreated = (user) => {
  const { password, ...newUser } = user;

  return newUser;
};

const returnUserLogin = (user) => {
  const { password, name, ...newUser } = user;

  return newUser;
};

const create = async (user) => {
  const search = await Models.user.findByEmail(user.email);

  if (search) return false;

  const userCreate = await Models.user.create({ ...user });

  return returnUserCreated(userCreate);
};

const login = async (user) => {
  const search = await Models.user.findByEmail(user.email);

  if (!search || search.password !== user.password) return false;

  return returnUserLogin(search);
};

module.exports = { create, login };
