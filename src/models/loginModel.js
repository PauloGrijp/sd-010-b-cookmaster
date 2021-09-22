const connection = require('./connection');

async function getUserEmail(email) {
  const db = await connection();

  const userEmail = await db.collection('users').findOne({ email });

  return userEmail;
}

module.exports = {
  getUserEmail,
};