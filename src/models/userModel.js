const mongoConnection = require('./connection');

const create = async ({ name, email, password }) => {
    const productsCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('users'));
  
    const createdProduct = await productsCollection.insertOne({ name, email, password });
    return {
      name,
      email,
      password,
      id: createdProduct.insertedId,
    };
  };

  module.exports = { create };
