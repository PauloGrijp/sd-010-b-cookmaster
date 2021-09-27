const messageError = { message: 'Invalid entries. Try again.' };

 const recipesValidations = (req, res, next) => {
  const recipe = req.body;
  if (!recipe.name || !recipe.ingredients || !recipe.preparation) {
    return res.status(400).json(messageError);
}
next();
};

 module.exports = { recipesValidations };