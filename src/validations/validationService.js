const userExists = (existingUser) => {
  if (existingUser) {
    return {
      number: 409,
      error: {
        message: 'Email already registered',
      },
    };
  }
};

module.exports = {
  userExists,
};