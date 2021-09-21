// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const emailExiste = async (user) => {
  const db = await connection();
  const todosUsuarios = await db.collection('users').find().toArray();
  return todosUsuarios.some((u) => u.email === user.email);
};

const cadastrarUsuario = async (user) => {
  const db = await connection();
  const userFinal = { 
    ...user, 
    role: 'user', 
  };
  
  const usuarioInserido = await db.collection('users').insertOne(userFinal);

  return { 
    user: { 
      _id: usuarioInserido.insertedId, 
      name: userFinal.name,
      role: userFinal.role,
      email: userFinal.email,
    },
  };
};

module.exports = { 
  emailExiste,
  cadastrarUsuario,
};