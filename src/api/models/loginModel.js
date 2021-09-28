const connection = require('./connection');

async function checkUserEmail(email) {
  const db = await connection();

  const result = await db.collection('users').findOne({ email });
  return result;
}

module.exports = {
  checkUserEmail,
};