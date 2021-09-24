const connection = require('./connection');

const create = async ({ name, email, password }) => {
 const db = await connection.getConnection();
 const newUser = await db.collection('users').insertOne({ name, email, password, role: 'user' }); 
 const { role, _id } = newUser.ops[0];

 return {
   user: {
     name,
     email,
     role,
     _id,
   },
 };
};

const findByEmail = async (email) => {
  const db = await connection.getConnection();
  const userEmail = await db.collection('users').findOne({ email });
  return userEmail;
};

const insertAdmin = async ({ name, email, password }) => {
  const db = await connection.getConnection();
  const newAdmin = await db.collection('users')
    .insertOne({ name, email, password, role: 'admin' }); 
  const { role, _id } = newAdmin.ops[0];
 
  return {
    user: {
      name,
      email,
      role,
      _id,
    },
  };
 };

module.exports = {
  create,
  findByEmail,
  insertAdmin,
};