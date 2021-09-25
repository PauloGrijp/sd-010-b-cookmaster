const recipesServices = require('./recipesServices');
const multerModel = require('../models/multerModel');

const createFile = async (token, id) => {
 // await recipesServices.validAutheToken(token);
 // const decode = await recipesServices.validTokenExist(token);
 console.log(token, 'decode');

 // const recipesResult =
};

module.exports = {
  createFile,
};