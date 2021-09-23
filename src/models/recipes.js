// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const receitas = async (receita) => {
  const db = await connection();

  const receitaInserida = await db.collection('recipes').insertOne(receita);

  return { 
    recipe: { 
      _id: receitaInserida.insertedId, 
      ...receita,
    },
  };
};

module.exports = { 
  receitas,
};