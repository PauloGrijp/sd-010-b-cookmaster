const connection = require('./connection');

const add = async (email, senha, nome) => {
  const db = await connection();
  const { insertedId, role } = await db.collection('users').insertOne({
    user: {
      email,
      senha,
      nome,
      role: 'user',
    },
  });

  return { user: { name: nome, email, role, _id: insertedId } };
};

module.exports = {
  add,
};
