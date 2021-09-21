const { connection } = require('./connection');

const createUser = async ({ name, email, password, role }) => {
  const userCollection = await connection()
  .then((db) => db.collection('users'));
  const { insertedId: id } = await userCollection.insertOne({ name, email, password, role });
  return {
    user: {
      name,
      email,
      password,
      role,
      id,
    },
  };
};

module.exports = {
  createUser,
};
