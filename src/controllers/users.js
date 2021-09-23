const { postUsers } = require('../services');

module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await postUsers(name, email, password);

  if (newUser.err) return next(newUser.err);

  const id = '_id';

  const responseObj = {
    user: {
      name: newUser.ops[0].name,
      email: newUser.ops[0].email,
      role: newUser.ops[0].role,
      _id: newUser.ops[0][id],
    },
  };

  return res.status(201).json(responseObj);
};
