const Models = require('../models');

const create = async (user) => {
  const userCreate = await Models.user.create({ ...user, role: 'user' });

  return userCreate;
};

module.exports = { create };
