// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const loginUsuario = async (user) => {
  const db = await connection();
  
  const usuarioInserido = await db.collection('users').find({
    $and: [
        { email: user.email },
        { password: user.password },
    ],
}).toArray();

  return usuarioInserido;
};

module.exports = { 
  loginUsuario,
};