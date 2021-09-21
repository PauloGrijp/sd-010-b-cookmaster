const usersModel = require('../models/usersModel');

function valid(body) {
  if (!body) {
    return { status: 400, message: 'Invalid entries. Try again' };
  }
  const { name, email, password } = body;
  if (!name) {
    return { status: 400, message: 'Invalid entries. Try again' };
  }
  if (!email) {
    return { status: 400, message: 'Invalid entries. Try again' };
  }
  if (!password) {
    return { status: 400, message: 'Invalid entries. Try again' };
  }
  return true;
}

const create = async (body) => {
  const validate = valid(body);
  if (validate.message) {
    return validate;
  }
  const findEmail = await usersModel.getByEmail(body.email);
  if (findEmail.length < 1) {
    return { status: 409, message: 'Email already registered' };
  }
  const { insertedId: _id } = await usersModel.create(body);
  return { user: {
    name: body.name,
    email: body.email,
    role: body.role,
    _id,
  } };
};

module.exports = {
  create,
};