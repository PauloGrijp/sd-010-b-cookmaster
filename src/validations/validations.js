const validEmail = (email) => {
  // console.log('email');
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  // console.log(emailRegex.test(email));
    return emailRegex.test(email);
};
const infosRecipe = (recipe) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    console.log('deu false');
    return false;
  }
    return true; 
};

const validPassword = (passwd) => {
  console.log('tamanho passwd', passwd.length);
   if (passwd.length < 8) {
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