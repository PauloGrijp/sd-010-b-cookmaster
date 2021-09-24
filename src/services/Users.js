const userModel = require('../models/Users');

const validateEntries = (name, email, password) => {
  if (!name || !email || !password || !email.match(/\S+@\S+\.\S+/)) {
    return { isError: true, message: 'Invalid entries. Try again.' };
  }
};

const createUser = async ({ name, email, password }) => {
  const checkEntries = validateEntries(name, email, password);
  if (checkEntries) return checkEntries;

  if (await userModel.findByEmail(email)) {
    return { emailError: true, message: 'Email already registered' };
  }  

  const user = await userModel.create({ name, email, password });
  return user;
};

const createAdmin = async ({ name, email, password, role }) => {
  if (role !== 'admin') {
    return { isError: true, message: 'Only admins can register new admins' };
  }
  // const checkEntries = validateEntries(name, email, password);
  // if (checkEntries) return checkEntries;

  const newAdmin = await userModel.insertAdmin({ name, email, password });
  return newAdmin;
};

module.exports = {
  createUser,
  createAdmin,  
};
