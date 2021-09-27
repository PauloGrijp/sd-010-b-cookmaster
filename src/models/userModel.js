const { connection } = require('./connection');

// req 1
const userCreate = async ({ name, email, password, role }) => {
  const dbConnection = await connection();
  const { insertedId: id } = await dbConnection.collection('users')
  .insertOne({ name, email, password, role });
  return { id, name, email, password, role };
};

// req 1
const findUserByEmail = async (email) => {
  const dbConnection = await connection();
  const foundUserByEmail = await dbConnection.collection('users').findOne({ email });
  return foundUserByEmail;
};

module.exports = {
  userCreate,
  findUserByEmail,
};
