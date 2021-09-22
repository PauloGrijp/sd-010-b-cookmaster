const { ObjectID } = require('mongodb');
const connection = require('./connection');

const recipes = 'recipes';

const create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const result = await db.collection(recipes).insertOne({ name, ingredients, preparation, userId });
  const createdRecipe = result.ops[0];
  return createdRecipe;
};

const getAll = async () => {
  const db = await connection();
  return db.collection(recipes).find({}).toArray();
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection(recipes).findOne(ObjectID(id));
  return result;
};

const buildFilterQueriesByRole = (filterData) => {
  const { id, userId, role } = filterData;
  switch (role) {
    case 'admin':
      return { _id: ObjectID(id) };
    default:
      return { $and: [{ _id: ObjectID(id) }, { userId }] };
  }
};

const update = async ({ id, name, ingredients, preparation, userId, role }) => {
  const db = await connection();
  
  const filterQuery = buildFilterQueriesByRole({ id, userId, role });
  
  const { value } = await db.collection(recipes).findOneAndUpdate(
    filterQuery,
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );

  return value;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};