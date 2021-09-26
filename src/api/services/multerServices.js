 const recipesServices = require('./recipesServices');
 const multerModel = require('../models/multerModel');

 const validCreateFile = async (token, id) => {
 recipesServices.validAutheToken(token);
 recipesServices.validTokenExist(token);
 const result = await multerModel.createFiledb(id);

 console.log(result, 'services');
};

module.exports = {
  validCreateFile,
};