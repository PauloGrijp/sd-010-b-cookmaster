module.exports = (err, _req, res, _next) => {
  console.log(err);
  const statusCode = {
    userAndRecipes: 400,
    login: 401,
    passwordOrLogin: 401,
    alreadyRegistered: 409,
    recipeNotFound: 404,
  };
  const statusMenssage = {
    userAndRecipes: 'Invalid entries. Try again.',
    login: 'All fields must be filled',
    passwordOrLogin: 'Incorrect username or password',
    alreadyRegistered: 'Email already registered',
    recipeNotFound: 'recipe not found',
  };

  return res.status(statusCode[err] || 500).json({ message: statusMenssage[err] });
};