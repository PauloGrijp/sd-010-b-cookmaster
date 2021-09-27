const jwt = require('jsonwebtoken');
const { postUsersService } = require('../services');
const { checkEmailPassword } = require('../services');

const postUsersController = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await postUsersService(name, email, password);

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

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const checkedEmailPassword = await checkEmailPassword(email, password);

  if (checkedEmailPassword.err) return next(checkedEmailPassword.err);

  const SECRET = 'superSenha';
  const { _id, role } = checkedEmailPassword;
  const payload = {
      _id,
      email: checkedEmailPassword.email,
      role,
   };
   const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
 };
  const token = jwt.sign({ data: payload }, SECRET, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = { postUsersController, login };
