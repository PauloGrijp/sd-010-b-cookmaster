const connection = require('./connection');

async function createItem(name, email, password) {
  const user = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));

    return {
      user: {
        name,
        email,
        role: 'user',
        _id: user.insertedId,
      },
    };
}

async function getByEmail(email) {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));

    return user;
}

const createAdm = async (name, email, password) => {
  const user = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'admin' }));

    return {
      user: {
        name,
        email,
        role: 'admin',
        _id: user.insertedId,
      },
    };
};

module.exports = {
  createItem,
  getByEmail,
  createAdm,
};