const { StatusCodes } = require('http-status-codes');

const Users = require('../services/Users');

const registerNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const addedUser = await Users.registerNewUser(name, email, password);
  if (addedUser.isErrorMessage) {
    return next({
      codeError: addedUser.codeError,
      isErrorMessage: addedUser.isErrorMessage,
    });
  }

  res.status(StatusCodes.CREATED).json(addedUser);
};

module.exports = {
  registerNewUser,
};
