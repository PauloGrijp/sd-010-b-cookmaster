const UserSchema = require('../schemas/UserSchema');

const validateInputs = (req, res, next) => {
  const user = req.body;
  const { code, message } = UserSchema.validate(user);

  if (code) {
    return res.status(code).json({ message });
  }

  next();
};

module.exports = {
  validateInputs,
};
