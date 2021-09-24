const regexEmail = require('../helpers/regexEmail');

// Comments: Lista de erros
const errors = {
  allFieldsFilled: 'All fields must be filled',
  incorrectUsernameOrPsw: 'Incorrect username or password',
};

// Comments: Valida se o argumento EMAIL passado no body existe ou não é vazio.
const validateEmailToken = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(401).json({ message: errors.allFieldsFilled });
  }

  next();
};

// Comments: Valida se o argumento EMAIL passado no body tem o formato de e-mail correto.
const validateEmailFormatToken = async (req, res, next) => {
  const { email } = req.body;

  if (!regexEmail(email)) return res.status(401).json({ message: errors.incorrectUsernameOrPsw });

  next();
};

// Comments: Valida se o argumento PASSWORD passado no body existe ou não é vazio.
const validatePasswordToken = async (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(401).json({ message: errors.allFieldsFilled });
  }

  next();
};

// Comments: Valida se o argumento PASSWORD passado no body está no padrão.
const validatePasswordFormatToken = async (req, res, next) => {
  const { password } = req.body;

  if (password.length < 8) {
    return res.status(401).json({ message: errors.incorrectUsernameOrPsw });
  }

  next();
};

module.exports = {
  validateEmailToken,
  validatePasswordToken,
  validateEmailFormatToken,
  validatePasswordFormatToken,
};
