const mongoConnection = require('./connection');
// const userModel = require('./userModel');

const create = async ({ name, ingredients, preparation }) => {
    const usersCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('recipes'));
     /*  const idUser = await userModel.findByEmail(id); 
     const idUser = await userModel.findById(id);
   const { _id: id } = idUser;
    if (!id) {
        return false;
    } */
    const createdUser = await usersCollection.insertOne({ name, ingredients, preparation });
    return {
      name,
      ingredients,
      preparation,
      _id: createdUser.insertedId,
      /* id */
    };
  };

module.exports = { create };
