const LoginSchema = require('../schemas/loginSchema');

const validateInputs = (req, res, next) => {
  const login = req.body;
  const { code, message } = LoginSchema.validate(login);

  if (code) {
    return res.status(code).json({ message });
  }

  next();
};

module.exports = {
  validateInputs,
};
