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

module.exports = {
  isRecipe,
};
