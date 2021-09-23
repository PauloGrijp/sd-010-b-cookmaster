const code = require('./codeHttp');
const error = require('./errorMessage');

const isRecipe = (searchResult) => {
  if (searchResult === null) {
    return {
      status: code.HTTP_NOT_FOUND,
      notification: { message: error.notFound },
    };
  }

  return {};
};

const validId = (idOfUser, userId, role) => {
  if (role !== 'admin' && idOfUser !== userId) {
    return {
      status: code.HTTP_UNAUTHORIZED,
      notification: { message: error.noAuthentication },
    };
  }

  return {};
};

module.exports = {
  isRecipe,
  validId,
};
