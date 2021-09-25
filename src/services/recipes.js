const { 
  fieldValidator,
  tokenValidator,
  idValidator,
} = require('../middleware/recipes');
const { modelRecipes, modelListById, modelUpdater, modelEraser, modelImageCreate,
 } = require('../models/recipes');

const servUpdater = async ({ id, name, ingredients, preparation }, tokenReceived) => {
const result = await modelListById(id);
if (!result) return { err: { message: 'recipe not found' }, code: 404 };

const invalidator = await fieldValidator(name, ingredients, preparation);
if (invalidator) {
  return invalidator;
}

const invalidatoken = await tokenValidator(tokenReceived);
if (invalidatoken) {
  return invalidatoken;
}
  return modelUpdater({ id, name, ingredients, preparation }, tokenReceived);
};

const servRecipes = async (recipes, tokenReceived) => { 
  const { name, ingredients, preparation } = recipes;
  const invalidator = await fieldValidator(name, ingredients, preparation);
  if (invalidator) {
    return invalidator;
  }

  const invalidatoken = await tokenValidator(tokenReceived);
  if (invalidatoken) {
    return invalidatoken;
  }

   return modelRecipes(recipes, tokenReceived);
};

const servListByID = async (id) => { 
  const invalidator = await idValidator(id);
  if (invalidator) {
    return invalidator;
  }
  const result = await modelListById(id);
  if (!result) return { err: { message: 'recipe not found' }, code: 404 };
 return result;
};

const servEraser = async (id, tokenReceived) => {
  const invalidatoken = await tokenValidator(tokenReceived);
  if (invalidatoken) {
    return invalidatoken;
  }
  const result = await modelEraser(id);
  if (!result) return { err: { code: 'invalid_data', message: 'Wrong id format' }, code: 422 };
  return result;
};

const servImageCreate = async (id, tokenReceived, image) => {
  const invalidatoken = await tokenValidator(tokenReceived);
  if (invalidatoken) {
    return invalidatoken;
  }
  const invalidator = await idValidator(id);
  if (invalidator) {
    return invalidator;
  }
  const resultID = await modelListById(id);
  if (!resultID) return { err: { message: 'recipe not found' }, code: 404 };

  const result = await modelImageCreate(id, image);
  if (!result) return { err: { message: 'recipe not found' }, code: 404 };
  return result;
};

module.exports = {
  servUpdater,
  servEraser,
  servRecipes,
  servListByID,
  servImageCreate,
};