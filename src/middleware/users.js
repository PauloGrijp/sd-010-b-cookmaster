const formsValidator = (name, email, password) => {
  const emailRegEx = RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!name || !email || !emailRegEx.test(email) || !password) {
    return { 
      err: {
      message: 'Invalid entries. Try again.',
     },
     code: 400 };
  }
    return false;
  };

 module.exports = {
   formsValidator, 
 };