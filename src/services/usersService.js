const usersModel = require('../models/usersModel');

function validBody({ name, email, password }) {
  const message = 'Invalid entries. Try again.';
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

const validLogin = (email, password) => {
  const message = 'All fields must be filled';
  if (!email) {
    return { status: 401, message };
  }

  if (!/^[a-z0-9._-]+@[a-z0-9]+\.([a-z.]+)?$/i.test(email)) {
    return { status: 401, message: 'Incorrect username or password' };
  }
  if (!password) {
    return { status: 401, message };
  }
  return true;
};

const create = async (body) => {
  const validate = validBody(body);
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

const login = async ({ email, password }) => {
  const validate = validLogin(email, password);
  if (validate.message) {
    return validate;
  }
  const findEmail = await usersModel.getByEmail(email);
  const findpass = await usersModel.getByPass(password);
  if (!findEmail || !findpass) {
    return { status: 401, message: 'Incorrect username or password' };
  }
  return usersModel.createToken({ name: findEmail.name, email: findEmail.email });
};

module.exports = {
  create,
  login,
};