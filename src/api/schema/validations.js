const invalidEntries = 'Invalid entries. Try again.';

const hasName = (name) => {
  if (!name) {
    return {
      message: invalidEntries,
    };
  }

  return {};
};

const hasEmail = (email) => {
  if (!email) {
    return {
      message: invalidEntries,
    };
  }

  return {};
};

const isEmailValid = (email) => {
  const reg = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

  if (!reg.test(email)) {
    return {
      message: invalidEntries,
    };
  }

  return {};
};

const hasPassword = (password) => {
  if (!password) {
    return {
      message: invalidEntries,
    };
  }

  return {};
};

const hasEmailLogin = (email) => {
  if (!email) {
    return {
      message: 'All fields must be filled',
    };
  }

  return {};
};

const hasPasswordLogin = (password) => {
  if (!password) {
    return {
      message: 'All fields must be filled',
    };
  }

  return {};
};

const validateCreationOfRecipes = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return {
      message: invalidEntries,
    };
  }

  return {};
};

module.exports = {
  hasName,
  hasEmail,
  isEmailValid,
  hasPassword,
  hasEmailLogin,
  hasPasswordLogin,
  validateCreationOfRecipes,
};