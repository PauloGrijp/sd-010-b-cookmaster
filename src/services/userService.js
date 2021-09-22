const userModel = require('../models/userModel');

const valideEmail = (email) => {
  if (!email.includes('@') || !email.includes('.com')) {
    return true;
  }
  return false;
};

const validePassword = (password) => {
  if (password.length < 8) {
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

const validationEmailPassword = (email, password) => {
  if (!!email || !password) {
    return 'All fields must be filed';
  }

  if (validePassword(password) || valideEmail(email)) {
    return 'Incorrect username or password';
  }
};

const validationEmail = async (email) => {
  const existEmail = await userModel.existEmail(email);
  
  if (existEmail !== null) {
    return 'Email already registered';
  }
};

module.exports = { validationEntries, validationEmail, validationEmailPassword };