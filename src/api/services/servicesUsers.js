const models = require('../models/modelUsers');
const validations = require('../utils/validations');
const generateToken = require('../utils/generateToken');

const create = async ({ name, email, password, role }) => {
  validations.userName(name);
  validations.userPassword(password);
  validations.userEmail(email);
  validations.userEmailIsValid(email);
  await validations.userEmailAlreadyExist(email);

  return models.create(name, email, password, role)
      .then((data) => {
        const user = { ...data.ops[0] };
        delete user.password;
        return ({ status: 201, user });
      });
};

const login = async ({ email, password }) => {
  validations.loginEmailPassword(email, password);
  await validations.loginConfirmUser(email, password);

  const user = await models.getByEmail(email);
  const token = generateToken(user);
  return ({ status: 200, token });
};

module.exports = { create, login };
