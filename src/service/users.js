const users = require('../models/users');

const createUser = async (name, email, password) => {
  const user = await users.findUser(email);
  console.log(user, !user);

  if (user) {
    return {
      message: 'Email already registered',
    }; 
  }
  return users.createUser(name, email, password);
};

const loginUser = async (email) => {
  const user = await users.findUser(email);
  console.log(user, !user);
  if (!user) {
    return {
      message: 'Incorrect username or password',
    }; 
  }
return user;
};

module.exports = { createUser, loginUser };