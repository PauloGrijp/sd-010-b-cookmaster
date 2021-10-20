const { usersModels } = require('../models');

const create = async (user) => {
  const { email } = user;
  
  const emailExists = await usersModels.findByEmail(email);
  
  if (emailExists) {
    return {
      error: {
        code: 409,
        message: 'Email already registered',
      },
    };
  }
  
  return usersModels.create(user);
};

module.exports = create;
