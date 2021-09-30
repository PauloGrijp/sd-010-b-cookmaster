const { validation } = require('../schemas/user');

const userCheck = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { code, message } = await validation({ name, email, password });

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  userCheck,
};
