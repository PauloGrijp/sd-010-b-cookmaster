const userModel = require('../models/userModel');

const valideEmail = (email) => {
  console.log(email);
  if (!email.includes('@') || !email.includes('.com')) {
    return true;
  }
  return false;
};

const validationEntries = (name, email, password) => {
  const result = valideEmail(email);
  if (!name || !email || !password || result) {
    return 'Invalid entries. Try again.';
  }
};

const validationEmail = async (email) => {
  const existEmail = await userModel.existEmail(email);
  
  if (existEmail !== null) {
    return 'Email already registered';
  }
};

module.exports = { validationEntries, validationEmail };