const err = require('./errorMessage');
const {
  HTTP_CONFLICT,
} = require('./codeHttp');

const checkName = (resultGetName) => {
  if (resultGetName) {
    return {
      status: HTTP_CONFLICT,
      notification: {
        message: err.alreadyExists,
      },
    };
  }

  return {};
};

module.exports = {
  checkName,
};
