const { ObjectId } = require('mongodb'); 
const { connection } = require('./connection');

// ---------------------------------------------------------------
// Requisito 1 e 12: MODEL responsável pelo cadastro de usuários na BASE DE DADOS, e retorno do usuário cadastrado.

const postUserModel = async ({ name, email, password, role }) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role }))
  .then((user) => ({ name, email, role, _id: ObjectId(user.insertedId) }));

// Requisito 1 e 2: MODEL responsável por verificar se "email" de usuário está registrado na BASE DE DADOS, e retorna "null" se não encontrar ou o usuário se estiver cadastrado.

const getUserByEmail = async (email) => connection()
.then((db) => db.collection('users').findOne({ email }));
  
// ---------------------------------------------------------------

  module.exports = {
    postUserModel,
    getUserByEmail,
  };
