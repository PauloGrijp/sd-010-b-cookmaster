const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
    const db = await connection();
    const users = await db.collection('recipes').find().toArray();
    return users;
};

const getById = async (id) => {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return recipe;
};

const create = async (recipe, id) => {
    const newRecipe = { ...recipe, userId: id };
    const db = await connection();
    const userCreated = await db.collection('recipes').insertOne(newRecipe);
    return {
        _id: userCreated.insertedId,
        ...newRecipe,
    };
};

const update = async (recipe, id, idRecipe) => {
    const testeID = ObjectId.isValid(idRecipe);
    if (!testeID) {
        return null;
    }
    const newRecipe = { ...recipe, userId: id };
    const db = await connection();
    const recipeUpdated = await db.collection('recipes')
        .updateOne({ _id: ObjectId(idRecipe) }, { $set: newRecipe });
    if (recipeUpdated.modifiedCount === 0) {
        return false;
    }
    return {
        _id: idRecipe,
        ...newRecipe,
    };
};

const exclude = async (id) => {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const db = await connection();
    const deleteP = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    if (deleteP.deletedCount === 1) return true;

    return false;
};
const uploadPicture = async (id, image) => {
    console.log('Aqui', id);
    // console.log(picture);
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const pictureUploaded = await db.collection('recipes').findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { image } },
        // https://stackoverflow.com/questions/35626040/how-to-get-updated-document-back-from-the-findoneandupdate-method
        { returnOriginal: false },
      );
      
      if (pictureUploaded.value.image === image) return pictureUploaded.value;
    
      return false;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
    uploadPicture,
};