const Models = require('../models');

const returnUser = (user) => {
  const { password, ...newUser } = user;
  
  return newUser;
};

const create = async (user) => {
  const search = await Models.user.findByEmail(user.email);

  if (search) return { emailError: { message: 'Email already registered' } };

  const userCreate = await Models.user.create({ ...user, role: 'user' });

  return returnUser(userCreate);
};

module.exports = { create };
