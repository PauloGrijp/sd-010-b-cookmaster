const { getConnection } = require('./connection');

const createUser = async (newUser) => {
  const { name, email } = newUser;
  const dbConnection = await getConnection()
  .then((db) => db.collection('users'));
  const duplicatedData = await dbConnection.findOne({ email });
  if (duplicatedData) return false;
  const { insertedId } = dbConnection.insertOne({ ...newUser, role: 'user' });
  const treatedUser = { name, email, role: 'user' };
  return { user: { insertedId, ...treatedUser } };
};

module.exports = createUser;