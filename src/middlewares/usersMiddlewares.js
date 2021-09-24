// Comments: Helpers
const regexEmail = require('../helpers/regexEmail');
const { getUserByEmail } = require('../model/usersModel');

// Comments: Lista de erros
const errors = {
  invalidEntries: 'Invalid entries. Try again.',
  emailAlreadyRegistered: 'Email already registered',
};

// Comments: Valida se o argumento NAME passado no body existe ou não é vazio.
const validateNameExists = async (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') return res.status(400).json({ message: errors.invalidEntries });

  next();
};

// Comments: Valida se o argumento EMAIL passado no body existe ou não é vazio.
const validateEmailExists = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') return res.status(400).json({ message: errors.invalidEntries });

  next();
};

// Comments: Valida se o argumento EMAIL passado no body tem o formato de e-mail correto.
const validateEmailFormat = async (req, res, next) => {
  const { email } = req.body;

  if (!regexEmail(email)) return res.status(400).json({ message: errors.invalidEntries });

  next();
};

// Comments: Valida se o argumento EMAIL passado no body já existe na base de dados.
const validateEmailIsRegistered = async (req, res, next) => {
  const { email } = req.body;

  const emailIsRegistered = await getUserByEmail(email);
  
  if (emailIsRegistered) {
    return res.status(409).json(
      { message: errors.emailAlreadyRegistered },
    );
  }

  next();
};

// Comments: Valida se o argumento PASSWORD passado no body existe ou não é vazio.
const validatePasswordExists = async (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') return res.status(400).json({ message: errors.invalidEntries });

  next();
};

module.exports = {
  validateNameExists,
  validateEmailExists,
  validateEmailFormat,
  validatePasswordExists,
  validateEmailIsRegistered,
};