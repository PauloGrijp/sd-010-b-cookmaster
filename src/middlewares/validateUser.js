const { getPassword } = require('../model/usersModel');

let err;
const statusError = 400;
const notCredential = 401;

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

const validateInput = (email, name, password, res) => {
    const verifyEmail = validateEmail(email);
    if (!name || !email || !password || !verifyEmail) {
        err = { message: 'Invalid entries. Try again.' };

      return res.status(statusError).json(err);
    }
  };

  const validateCredential = async (email, password, res) => {
    const verifyEmail = validateEmail(email);
    const passwordUser = await getPassword(email);
    if (!verifyEmail || password !== passwordUser) {
        err = { message: 'Incorrect username or password' };
      return res.status(notCredential).json(err);
    }

  };

  const validateLogin = async (email, password, res) => {
    if (!email || !password) {
        err = { message: 'All fields must be filled' };
      return res.status(notCredential).json(err);
    }
  };
module.exports = { validateInput, validateLogin, validateCredential };
