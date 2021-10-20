const {
  findOne,
  register,
} = require('../models/usersModels');

const { error } = require('../middlewares/error');

const {
  created,
  conflict,
} = error.codeStatus;
const {
  alreadyRegistered,
} = error.errorMessage;

const usersServices = async ({ name, email, password, role }) => {
  const user = await findOne(email);
  if (user) {
    return ({
      statusCode: conflict,
      infos: {
        err: {
          code: conflict,
          message: alreadyRegistered,
        },
      },
    });
  }
  const result = await register({ name, email, password, role });
  return {
    statusCode: created,
    infos: result,
  };
};

module.exports = {
  usersServices,
};
