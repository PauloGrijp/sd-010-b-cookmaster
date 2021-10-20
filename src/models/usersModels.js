const connection = require('./connection');

const register = async ({ name, email, password, role }) => {
 const db = await connection();
 const newUser = await db.collection('users')
  .insertOne({
    name,
    email,
    password,
    role,
  }); 
 const { _id } = newUser.ops[0];
 return {
   user: {
     name,
     email,
     role,
     _id,
   },
 };
};

const findOne = async (email) => {
  const db = await connection();
  const userEmail = await db.collection('users').findOne({ email });
  return userEmail;
};

module.exports = {
  register,
  findOne,
};
