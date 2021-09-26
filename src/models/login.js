const connection = require('./connection');

const userLogin = async (email, password) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  if (!user || user.password !== password) return { loginError: true };

  return user;
};

module.exports = {
  userLogin,
};
