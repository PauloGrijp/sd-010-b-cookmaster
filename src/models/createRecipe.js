const { getConnection } = require('./connection');

const createRecipe = async (recipe) => {
const { insertedId } = await getConnection()
.then((db) => db.collection('recipes').insertOne({ ...recipe }));
return { recipe: { ...recipe, insertedId } };
};

module.exports = createRecipe;