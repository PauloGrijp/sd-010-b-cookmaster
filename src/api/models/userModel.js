const connection = require('./connection');

const getUserByEmail = async (email) => {
    const users = await connection().then((db) => db.collection('users')
      .findOne({ email }));
    
    if (users) {
      const { password: passBD, ...userWithoutPassword } = users;
      return userWithoutPassword;
    } 
    
    return users;
  };
const createUser = async (email, name, password) => {
    const user = await connection().then((db) =>
      db.collection('users')
        .insertOne({ email, name, password, role: 'user' }));
    const { password: passBD, ...userWithoutPassword } = user.ops[0];
    return userWithoutPassword;
  };

module.exports = {
    getUserByEmail,
    createUser,
};
