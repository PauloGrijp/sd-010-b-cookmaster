const { ObjectId } = require('mongodb');
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

  const todasReceitas = await db.collection('recipes').find({}).toArray();

  return todasReceitas;
};

const buscarReceitasID = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  console.log(id);

  const db = await connection();

  const receita = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  console.log(receita);

  return receita;
};

module.exports = { 
  cadastrarReceitas,
  buscarReceitas,
  buscarReceitasID,
};