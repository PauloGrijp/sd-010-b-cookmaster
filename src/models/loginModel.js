const connection = require('./connection');

async function login(email) {
  const findDataLogin = await connection()
    .then((db) => db.collection('users').findOne({ email }));
    // delete password;
    return findDataLogin;
}

module.exports = {
  login,
};
