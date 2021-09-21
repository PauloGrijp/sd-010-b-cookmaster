const { connection } = require('./connection');

/**
 * 
 * @param {object} user nome, email, senha e role do  usuário
 * @returns {promise}
 */
const createUser = async ({ name, email, password, role }) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  return {
    name,
    email,
    password, 
    role: 'user',
    id: user.insrtedId,
  };
};

/**
 * 
 * @param {string} email email do usuário da requisição
 * @returns {promise}
 */
const emailExists = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = { 
  createUser,
  emailExists,
};
