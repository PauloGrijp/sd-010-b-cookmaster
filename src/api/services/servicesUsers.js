const models = require('../models/modelUsers');
const validations = require('../utils/validations');

const create = async ({ name, email, password, role }) => {
  validations.userName(name);
  validations.userPassword(password);
  validations.userEmail(email);
  validations.userEmailIsValid(email);
  await validations.userEmailAlreadyExist(email);

  return models.create(name, email, password, role)
      .then((data) => ({ status: 201, user: data.ops[0] }));
};

module.exports = { create };
