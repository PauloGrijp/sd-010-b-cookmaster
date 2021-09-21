const Models = require('../models');

const returnUserCreated = (user) => {
  const { password, ...newUser } = user; // https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object

  return newUser;
};

const returnUserLogin = (user) => {
  const { password, name, ...newUser } = user; // https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object

  return newUser;
};

const create = async (user) => {
  const search = await Models.user.findByEmail(user.email);

  if (search) return false;

  const userCreate = await Models.user.create({ ...user, role: 'user' });

  return returnUserCreated(userCreate);
};

const login = async (user) => {
  const search = await Models.user.findByEmail(user.email);

  if (!search || search.password !== user.password) return false;

  return returnUserLogin(search);
};

module.exports = { create, login };
