const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
    const db = await connection();

    const recipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

    return recipe.ops[0];
};

const listRecipes = async () => {
    const db = await connection();
    
    const recipes = await db.collection('recipes').find().toArray();

    return recipes;
};

const recipesById = async (id) => {
    const db = await connection();

    const recipes = await db.collection('recipes').findOne(ObjectId(id));

    return recipes;
};

const updateById = async (req) => {
    const db = await connection();
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;
    const { id } = req.params;

    await db.collection('recipes').updateOne(
        { _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } },
);

        return { name, ingredients, preparation, _id: ObjectId(id), userId };
};

const deleteRecipe = async (id) => {
    const db = await connection();
    const recipe = await db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) });
    console.log(recipe, 'model');

    return recipe;
};

module.exports = {
    createRecipe,
    listRecipes,
    recipesById,
    updateById,
    deleteRecipe,
};