const connection = require('./connection');

const add = async (email, senha, nome) => {
  const role = 'user';
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({
    user: {
      email,
      senha,
      nome,
      role,
    },
  });

  return { user: { name: nome, email, role, _id: insertedId } };
};

module.exports = {
  add,
};
