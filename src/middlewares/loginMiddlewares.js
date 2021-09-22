const emptyEntries = {
  message: 'All fields must be filled',
};
const incorrectEntries = {
  message: 'Incorrect username or password',
};
const status401 = 401;

const checkEmailPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(status401).json(emptyEntries);
  }
  next();
};

const validateEmailPassword = (req, res, next) => {
  const { email, password } = req.body;
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email) || password.length < 4) {
    return res.status(status401).json(incorrectEntries);
  }
  next();
};

module.exports = {
  checkEmailPassword,
  validateEmailPassword,
};