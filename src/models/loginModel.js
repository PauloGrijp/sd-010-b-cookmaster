const connection = require('./connection');

async function login(email, password) {
  const findDataLogin = await connection()
    .then((db) => db.collection('users').findOne({ email, password }));

    return findDataLogin;
}

module.exports = {
  login,
};
