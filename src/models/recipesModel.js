const mongoConnection = require('./connection');
const userModel = require('./userModel');

const create = async ({ name, ingredients, preparation }, email) => {
    const usersCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('recipes'));
    const idUser = await userModel.findByEmail(email);
    const { _id: id } = idUser;
    const createdUser = await usersCollection.insertOne({ name, ingredients, preparation });
    return {
      name,
      ingredients,
      preparation,
      _id: createdUser.insertedId,
      id,
    };
  };

module.exports = { create };
