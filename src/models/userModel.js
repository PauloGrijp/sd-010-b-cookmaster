const connection = require('./connection');

const create = async (name, email, password) => {
  const db = await connection();
  const user = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
    return { user: { name, email, role: 'user', _id: user.insertedId } };
};

const findByEmail = async (email) => {
  const conectDB = await connection();
  const userEmail = await conectDB.collection('users').findOne({ email });

  // Caso nenhum user seja encontrado, devolvemos null
  if (!userEmail) return null;

  // Caso contrário, retornamos o user encontrado
  return (userEmail);
};

module.exports = {
  create,
  findByEmail,
};
