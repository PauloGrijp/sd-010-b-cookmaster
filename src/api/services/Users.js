const Users = require('../models/Users');

const validations = require('../schemas/usersValidation');

const validatingIfDataIsValid = (name, email, password) => {
  const ifNameEmailPasswordExists = validations.ifNameEmailPasswordExists(name, email, password);
  if (ifNameEmailPasswordExists.isErrorMessage) {
    return {
      codeError: ifNameEmailPasswordExists.codeError,
      isErrorMessage: ifNameEmailPasswordExists.isErrorMessage,
    };
  }

  const ifEmailIsValid = validations.ifEmailIsValid(email);
  if (ifEmailIsValid.isErrorMessage) {
    return {
      codeError: ifEmailIsValid.codeError,
      isErrorMessage: ifEmailIsValid.isErrorMessage,
    };
  }

  return true;
};

const registerNewUser = async (name, email, password) => {
  const ifDataIsValid = validatingIfDataIsValid(name, email, password);
  if (ifDataIsValid.isErrorMessage) {
    return {
      codeError: ifDataIsValid.codeError,
      isErrorMessage: ifDataIsValid.isErrorMessage,
    };
  }

  const ifEmailIsUnique = await validations.ifEmailIsUnique(email);
  if (ifEmailIsUnique.isErrorMessage) {
    return {
      codeError: ifEmailIsUnique.codeError,
      isErrorMessage: ifEmailIsUnique.isErrorMessage,
    };
  }
  
  const addedUser = await Users.registerNewUser(name, email, password);
  if (addedUser.isErrorMessage) return { isErrorMessage: addedUser.isErrorMessage };

  return { user: addedUser };
};

module.exports = {
  registerNewUser,
};
