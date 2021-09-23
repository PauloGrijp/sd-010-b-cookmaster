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

const loginValidator = (email, password) => {
  const emailRegEx = RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
  if (!email || !emailRegEx.test(email) || !password) {
    return { 
      err: {
      message: 'All fields must be filled',
     },
     code: 401 };
  }
};

 module.exports = {
   formsValidator,
   loginValidator, 
 };