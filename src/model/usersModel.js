// ---------------------------------------------------------------
// Requisito 1: MODEL responsável pelo cadastro de usuários do tipo "user" na BASE DE DADOS, e retorno do usuário cadastrado.

const { ObjectId } = require('mongodb'); 
const { connection } = require('./connection');

const postUserModel = async ({ name, email, password }) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password }))
  .then((user) => ({ _id: ObjectId(user.insertedId), name, email, password }));

  module.exports = {
    postUserModel,
  };