// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUsersModel = async (user) => {
  const DB = await connection();
  const products = await DB.collection('users').insertOne(user);
  return products.ops[0];
};

const showAllEsersModel = async () => connection()
  .then((DB) => DB.collection('users').find().toArray());

const showByEmailUsersModel = async (email) => {
  const DB = await connection();
  return DB.collection('users').findOne({ email });
};

module.exports = {
  createUsersModel,
  showAllEsersModel,
  showByEmailUsersModel,
};