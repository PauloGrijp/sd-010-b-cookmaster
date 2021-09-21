const invalidEntries = { message: 'Invalid entries. Try again.' };
const status400 = 400;

const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
     return res.status(status400).json(invalidEntries);
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const re = /\S+@\S+\.\S+/;
  if (!email || !re.test(email)) {
    return res.status(status400).json(invalidEntries);
  }
  
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(status400).json(invalidEntries);
  }
  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};