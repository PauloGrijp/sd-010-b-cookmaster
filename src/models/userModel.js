const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getUserByEmail = async (field, data) => {
  let value = data;
  if (field === '_id') {
    value = ObjectId(data);
  }
  const result = await connection().then(db => 
    db.collection('users').findOne({ [field]: value }));
  return result;
};

const createNewUser = async (data) => {
  const { name, email, password, role } = data;
  const inserted = await connection().then((db => 
    db.collection('users').insertOne({ name, email, password, role })));
  return { _id: inserted.insertedId, name, email, password, role };
  };

module.exports = {
    getUserByEmail,
    createNewUser,
};
