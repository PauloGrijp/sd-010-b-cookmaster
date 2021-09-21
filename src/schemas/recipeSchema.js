const Joi = require('joi');
const { ObjectId } = require('mongodb');

const responseCodes = {
  success: 200,
  created: 201,
  notFound: 404,
  notAuthorized: 401,
  badRequest: 400,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const errorsMessages = {
  recipeNotFound: 'recipe not found',
  incorrectData: 'Incorrect username or password',
  quantityNotNumber: '"quantity" must be a number',
  fillAllFields: 'All fields must be filled',
  invalidEntries: 'Invalid entries. Try again.',
};

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { response: responseCodes.notFound, message: errorsMessages.recipeNotFound };
  }
};

const validateRecipeData = (recipeData) => {
  const { error } = recipeSchema.validate(recipeData);
  if (error) {
    return { response: responseCodes.badRequest, message: errorsMessages.invalidEntries };
  }
};
module.exports = {
  validateRecipeData,
  validateId,
};
