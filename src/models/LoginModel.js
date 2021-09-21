const { connection } = require('./connection');

const findUser = async (username, password) => {
  const userCollection = await connection();
  await userCollection.findOne({ username, password });
  return { username, password };
};

module.exports = {
  findUser,
};