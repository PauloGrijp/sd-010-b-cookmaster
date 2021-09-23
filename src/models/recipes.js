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

const editarReceita = async (id, receitaEditada, usuario) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await connection();

  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { 
      name: receitaEditada.name,
      ingredients: receitaEditada.ingredients,
      preparation: receitaEditada.preparation,
    } },
  );

  return { _id: id, userId: usuario.id, ...receitaEditada };
};

module.exports = { 
  cadastrarReceitas,
  buscarReceitas,
  buscarReceitasID,
  editarReceita,
};