const { connect } = require('./connection');

const usersCollection = 'users';

const userLogin = async (email, password) => {
  const db = await connect();
  const user = await db.collection(usersCollection).findOne({ email });

  if (!user || user.password !== password) return { loginError: true };

  return user;
};

module.exports = {
  userLogin,
};