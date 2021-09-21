const { getConnection } = require('./connection');

const createUser = async (newUser) => {
  const { name, email } = newUser;
  const dbConnection = await getConnection()
  .then((db) => db.collection('users'));
  const duplicatedData = await dbConnection.findOne({ email });
  if (duplicatedData) return false;
  const treatedUser = { name, email, role: 'user' };
  const { insertedId } = dbConnection.insertOne(treatedUser);
  return { user: { insertedId, ...treatedUser } };
};

module.exports = createUser;