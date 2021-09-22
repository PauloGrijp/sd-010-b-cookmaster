const userModel = require('../Model/usersModel');

const validEmail = (email) => {
  // console.log('email');
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  // console.log(emailRegex.test(email));
  return emailRegex.test(email);
};
const infosRecipe = (recipe) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    return false;
  }
  return true;
};

const validPassword = async (user) => {
  const { email, password } = user;
  const senha = await userModel.getPasswdByEmail(email);
  console.log('validations validPasswd');
  console.log(senha);
  if (senha === false) {
    return false;
  }
  console.log('passwd', password);
  if (senha !== password) {
    return false;
  }
  return true;
};

const allInfos = (user) => {
  const { name, password, email } = user;
  if (!name || !password || !email) return false;
  return true;
};

const loginValidations = (user) => {
  const { password, email } = user;
  if (!password || !email) return false;
  return true;
};

module.exports = { validEmail, allInfos, loginValidations, validPassword, infosRecipe };