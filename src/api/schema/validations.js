const hasName = (name) => {
  if (!name) {
    return {
      message: 'Invalid entries. Try again.',
    };
  }

  return {};
};

const hasEmail = (email) => {
  if (!email) {
    return {
      message: 'Invalid entries. Try again.',
    };
  }

  return {};
};

const isEmailValid = (email) => {
  const reg = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

  if (!reg.test(email)) {
    return {
      message: 'Invalid entries. Try again.',
    };
  }

  return {};
};

const hasPassword = (password) => {
  if (!password) {
    return {
      message: 'Invalid entries. Try again.',
    };
  }

  return {};
};

module.exports = {
  hasName,
  hasEmail,
  isEmailValid,
  hasPassword,
};