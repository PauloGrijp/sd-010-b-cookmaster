const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');
const getRecipeById = require('./getRecipeById');

const upload = async (url, id, userId) => {
  console.log(userId);
  await getConnection()
  .then((db) => db.collection('recipes')
  .updateOne(
    {
      _id: ObjectId(id),
      userId,
    },
    { 
      $set: { image: url },
    },
  ));
  return getRecipeById(id);
};

const uploadAdmin = async (url, id) => {
  await getConnection()
  .then((db) => db.collection('recipes')
  .updateOne(
    {
      _id: ObjectId(id),
    },
    { 
      $set: { image: url },
    },
    ));
    
    return getRecipeById(id);
};

module.exports = {
  upload,
  uploadAdmin,
};
