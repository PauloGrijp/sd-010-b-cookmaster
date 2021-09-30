const { createNewUser } = require('../service/users');

let err;
const success = 201;
const erroCredential = 400;
const comflictErros = 409;

const createUser = async (req, res) => {
  const createdUser = await createNewUser(req.body);
  if (createdUser === 'error validate') {
    err = { message: 'Invalid entries. Try again.' };
    return res.status(erroCredential).json(err);
  }
  if (createdUser === 'user exists') {
    err = { message: 'Email already registered' };
    return res.status(comflictErros).json(err);
  }
  return res.status(success).json(createdUser);
};

module.exports = {
  createUser,
};
