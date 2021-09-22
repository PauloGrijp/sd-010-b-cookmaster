const code = require('./codeHttp');
const error = require('./errorMessage');

const checkUser = (user, returnDataBase) => {
  if (returnDataBase === null) {
    return {
      status: code.HTTP_UNAUTHORIZED,
      notification: { message: error.incorrectField },
    };
  }

  if (user.password !== returnDataBase.password) {
    return {
      status: code.HTTP_UNAUTHORIZED,
      notification: { message: error.incorrectField },
    };
  }

  return {};
};

module.exports = {
  checkUser,
};