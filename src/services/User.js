const User = require('../models/User');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const getAll = async () => User.getAll();

const generateError = (message, status) => (
  {
    error: {
      message,
      status,
    },
  }
);

const validateEmail = (email) => {
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) return false;
  return true;
};

const findById = async (id) => {
  const product = await User.findById(id);

  if (!product) return generateError('Wrong id format');
  
  return product;
};

const create = async ({ name, email, password, role = 'user' }) => {
  if (!name) return generateError('Invalid entries. Try again.', BAD_REQUEST);
  if (!validateEmail(email)) return generateError('Invalid entries. Try again.', BAD_REQUEST);
  if (!password) return generateError('Invalid entries. Try again.', BAD_REQUEST);

  const existingProduct = await User.findByMail(email);
  if (existingProduct) return generateError('Email already registered', CONFLICT);

  return User.create({ name, email, password, role });
};

const update = async (id, name, quantity) => {
  if (name.length < 5) return generateError('"name" length must be at least 5 characters long');
 
  if (!Number.isInteger(quantity)) return generateError('"quantity" must be a number');

  if (quantity <= 0) return generateError('"quantity" must be larger than or equal to 1');
  return User.update(id, name, quantity);
};

const remove = async (id) => {
  const product = await User.findById(id);
  if (!product) return generateError('Wrong id format');

  return User.remove(id) ? product : null;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};