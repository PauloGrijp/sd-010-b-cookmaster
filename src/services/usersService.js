const usersModel = require('../models/usersModel');

const message = 'Invalid entries. Try again.';
function validName({ name }) {
  if (!name) {
    return { status: 400, message };
  }
  return true;
}
function validLogin({ email, password }) {
  if (!email) {
    return { status: 400, message };
  }

  if (!/^[a-z0-9._-]+@[a-z0-9]+\.([a-z.]+)?$/i.test(email)) {
    return { status: 400, message };
  }
  if (!password) {
    return { status: 400, message };
  }
  return true;
}

const create = async (body) => {
  const validateName = validName(body);
  const validate = validLogin(body);
  if (validate.message || validateName.message) {
    return validate;
  }
  const findEmail = await usersModel.getByEmail(body.email);
  if (findEmail) {
    return { status: 409, message: 'Email already registered' };
  }
  const { insertedId: _id } = await usersModel.create(body);
  return { user: {
    name: body.name,
    email: body.email,
    role: 'user',
    _id,
  } };
};

const login = async (email, password) => {
  const validate = validLogin({ email, password });
  if (validate.message) {
    return validate;
  }
};

module.exports = {
  create,
  login,
};