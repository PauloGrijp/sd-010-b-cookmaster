const usersModel = require('../models/usersModel');

const message = 'Invalid entries. Try again.';
function valid({ name, email, password }) {
  if (!name) {
    return { status: 400, message };
  }
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
  const validate = valid(body);
  if (validate.message) {
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

module.exports = {
  create,
};