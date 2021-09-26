const { StatusCodes } = require('http-status-codes');
const { findUser } = require('../services/users');

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'All fields must be filled' });
  }

  const result = await findUser(email, password);

  if(result === null) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Incorrect username or password' });
  }

  return res.status(StatusCodes.OK)
    .json(result);
}

module.exports = { login };
