const { StatusCodes } = require('http-status-codes');

const Users = require('../services/Users');

const registerNewUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const addedUser = await Users.registerNewUser(name, email, password, role);
  if (addedUser.isErrorMessage) {
    return next({
      codeError: addedUser.codeError,
      isErrorMessage: addedUser.isErrorMessage,
    });
  }

  res.status(StatusCodes.CREATED).json(addedUser);
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const token = await Users.loginUser(email, password);
  if (token.isErrorMessage) {
    return next({
      codeError: token.codeError,
      isErrorMessage: token.isErrorMessage,
    });
  }

  res.status(StatusCodes.OK).json(token);
};

module.exports = {
  registerNewUser,
  loginUser,
};
