const { getConnection } = require('./connection');


const createUser = async({ name, email, password }) => {
  const db = await getConnection();
  
  const { insertedId: id } = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });

  return {
    user: {
      name,
      email,
      role: 'user',
      _id: id 
    },
  };

};

const findByEmail = async(email) => {
  const db = await getConnection();
  const user = await db.collection('users').findOne({ email });
  if (!user) return null;
  return user;
}

module.exports = {
  createUser,
  findByEmail,
}