const invalidEntries = { message: 'Invalid entries. Try again.' };
const invalidFields = { message: 'All fields must be filled' };
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const emailTester = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

  if (!email || typeof email !== 'string') {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  if (!emailTester.test(email)) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  next();
};

const isValidIngredients = (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients || typeof ingredients !== 'string') {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  next();
};

const isValidPreparation = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation || typeof preparation !== 'string') {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  next();
};

const fieldEmail = (req, res, next) => {
  const { email } = req.body; 
  if (!email || typeof email !== 'string') {
    return res.status(UNAUTHORIZED).json(invalidFields);
  } 

  next();
};

const fieldPassword = (req, res, next) => {
  const { password } = req.body; 
  if (!password || typeof password !== 'string') {
    return res.status(UNAUTHORIZED).json(invalidFields);
  } 

  next();
};

module.exports = {
  isValidEmail,
  isValidName,
  isValidIngredients,
  isValidPreparation,
  fieldEmail,
  fieldPassword,
};
