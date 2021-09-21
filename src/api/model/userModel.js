const connection = require('./connection');

const findByEmail = async (email) => {
  const Cookmaster = await connection();
  const user = await Cookmaster.collection('users');
  
  const query = { email };

  const result = await user.findOne(query);

  return result;
};

const createUser = async ({ name, email, password }) => {
  const Cookmaster = await connection();
  const user = await Cookmaster.collection('users');

  const { insertedId: _id } = await user.insertOne({ name, email, password, role: 'user' });

  return {
    _id,
    name,
    email,
    role: 'user',
  };
};

const login = async ({ email, password }) => {
  const Cookmaster = await connection();
  const user = await Cookmaster.collection('users');

  const query = { email, password };
  const result = await user.findOne(query);
  return result === null;
};

module.exports = {
  createUser,
  findByEmail,
  login,
};
