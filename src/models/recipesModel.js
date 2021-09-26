const { ObjectId } = require('mongodb'); 
const connection = require('./connection');

const myCollection = 'recipes';

const createNewRecipe = async (name, ingredients, preparation, userId) => {
    const db = await connection();
            const newRecipeRegistered = await db.collection(myCollection)
            .insertOne({ name, ingredients, preparation, userId });
            return newRecipeRegistered.ops[0];
};

const findAllRecipes = async () => {
    const db = await connection();
    const allRecipes = await db.collection(myCollection)
    .find().toArray();
    return allRecipes;
};

const findRecipeById = async (id) => {
    const db = await connection();
    const recipe = await db.collection(myCollection).findOne({ _id: ObjectId(id) });
    return recipe;
};

const updateRecipeByid = async (name, ingredients, preparation, recipeId) => {
    const db = await connection();
    const recipe = await 
    db.collection(myCollection)
    .findOneAndUpdate({ _id: ObjectId(recipeId) }, { $set: { name, ingredients, preparation } });
    return recipe.value;
};

const deleteRecipeByid = async (recipeId) => {
    const db = await connection();
    await db.collection(myCollection).deleteOne({ _id: ObjectId(recipeId) });
};

const imageUpload = async (recipeId, imagePath) => {
    const db = await connection();
     await 
    db.collection(myCollection)
    .findOneAndUpdate({ _id: ObjectId(recipeId) }, { $set: { image: imagePath } });
};

// db.collection('sales').deleteOne({ _id: ObjectId(id) })

// db.collection('sales').updateOne({ _id: ObjectId(id) }, { 
//     //     $set: productsSoldOut,
        
//     //  });

module.exports = {
    createNewRecipe,
    findAllRecipes,
    findRecipeById,
    updateRecipeByid,
    deleteRecipeByid,
    imageUpload,
};