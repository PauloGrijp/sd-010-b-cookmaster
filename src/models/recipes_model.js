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

    console.log(recipes, 'model');

    return recipes;
};

const updateById = async (req) => {
    const db = await connection();
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;
    const { id } = req.params;

    const recipe = await db.collection('recipes').updateOne(
        { _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } },
);
        console.log(recipe, 'model');
        return { name, ingredients, preparation, _id: ObjectId(id), userId };
};

module.exports = {
    createRecipe,
    listRecipes,
    recipesById,
    updateById,
};