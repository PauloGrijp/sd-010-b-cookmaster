const { connection } = require('./connection');

const createUser = async ({ name, email, password, role }) => {
  const userCollection = await connection()
  .then((db) => db.collection('users'));
  const { insertedId: id } = await userCollection.insertOne({ name, email, password, role });
  return { name, email, password, role, id };
};

const findByEmail = async (email) => {
  const userCollection = await connection()
  .then((db) => db.collection('users'));
  const user = await userCollection.findOne({ email });
  return user;
};
  
module.exports = {
  createUser,
  findByEmail,
};