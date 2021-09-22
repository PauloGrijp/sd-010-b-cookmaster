const { StatusCodes } = require('http-status-codes');
const model = require('../models/usersModel');

const error = 'Invalid entries. Try again.';
// const incorrect = 'Incorrect username or password';
// const reqFields = 'All fields must be filled';

const validateFields = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const regEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  // if (!email) {
  //   console.log('validou o email');
  //   return res.status(StatusCodes.UNAUTHORIZED).json({ message: reqFields });
  // }
  if (!regEmail.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
  next();
};

// const validEmail = async (req, res, next) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(StatusCodes.UNAUTHORIZED).json({ message: reqFields });
//   }
//   const regEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
//   if (!regEmail.test(email)) {
//     console.log('validou o email');
//     return res.status(StatusCodes.UNAUTHORIZED).json({ message: incorrect });
//   }
//   next();
// };

// const validatePassword = async (req, res, next) => {
//   const { password } = req.body;
//   if (!password) {
    // return res.status(StatusCodes.UNAUTHORIZED).json({ message: reqFields });
//   }
//   if (password.length < 6) {
//     console.log('validou a senha');
//     return res.status(StatusCodes.UNAUTHORIZED).json({ message: incorrect });
//   }
//   next();
// };

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await model.emailExists(email);
  if (user) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

// const validateLogin = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     console.log(`Aqui tá o email: ${email}`);
//   console.log(`Aqui tá a senha: ${password}`);
//     console.log('tá faltando email ou senha');
//     return res.status(StatusCodes.UNAUTHORIZED).json({ message: reqFields });
//   }
//   next();
// };

module.exports = {
  validateFields,
  validateEmail,
  // validEmail,
  // validatePassword,
  emailExists,
  // validateLogin,
};
