const validateField = (field) => {
  // SOURCE: https://stackoverflow.com/questions/47468361/get-variable-name-into-string-in-javascript/47468674
  const varToString = (varObj) => Object.keys(varObj)[0];
  //---------------------------
  
  if (!field) {
    return {
      error: {
        status: 400,
        message: `"${varToString(field)}" is required`,
      },
    };
  }

  if (field.length <= 0) {
    return {
      error: {
        status: 400,
        message: `"${varToString(field)}" is not allowed to be empty`,
      },
    };
  }

  return { message: 'Succefull' };
};

module.exports = {
  validateField,
};