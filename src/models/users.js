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

const checkEmailUniquity = async (email) => {
  const db = await connection();

  let checkEmail = null;

  checkEmail = await db.collection('users').findOne({ 'user.email': email });

  if (checkEmail) return true;
};

module.exports = {
  add,
  checkEmailUniquity,
};
