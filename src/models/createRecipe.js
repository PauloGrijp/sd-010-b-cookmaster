const { getConnection } = require('./connection');

const createRecipe = async (recipe) => {
const { insertedId } = await getConnection()
.then((db) => db.collection('recipes').insertOne({ ...recipe }));
return { recipe: { _id: insertedId, ...recipe } };
};

module.exports = createRecipe;