const auth = require('./auth');
const errorMiddleware = require('./errorMiddleware');
const loginValidate = require('./loginValidate');
const usersValidate = require('./usersValidate');
const recipeValidate = require('./recipeValidate');
const upload = require('./upload');

module.exports = {
  auth,
  errorMiddleware,
  loginValidate,
  usersValidate,
  recipeValidate,
  upload,
};
