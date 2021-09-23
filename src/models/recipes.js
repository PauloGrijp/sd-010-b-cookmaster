// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const cadastrarReceitas = async (receita) => {
  const db = await connection();

  const receitaInserida = await db.collection('recipes').insertOne(receita);

  return { 
    recipe: { 
      _id: receitaInserida.insertedId, 
      ...receita,
    },
  };
};

const buscarReceitas = async () => {
  const db = await connection();

  const todasReceitas = db.collection('recipes').find({}).toArray();

  return todasReceitas;
};

module.exports = { 
  cadastrarReceitas,
  buscarReceitas,
};