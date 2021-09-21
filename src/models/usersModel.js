const connection = require('./connection');

const create = async (body) => {
  connection().then((db) => db.collection('users'));
};