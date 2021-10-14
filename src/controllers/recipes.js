const { recipesServices } = require('../services');
const httpCodes = require('../constants/httpCodes.json');
const { upload } = require('../middlewares');

exports.createRecipe = async (req, res, next) => {
  const recipe = req.body;
  const { _id: userId } = req.user;
  try {
    const response = await recipesServices.createRecipeSvc({
      ...recipe,
      userId,
    });
    const { ops } = response;
    const [newRecipe] = ops;
    res.status(httpCodes.HTTP_CREATED).json({ recipe: newRecipe });
  } catch (error) {
    next(error);
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await recipesServices.getRecipesSvc();
    res.status(httpCodes.HTTP_OK).json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.findRecipe = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await recipesServices.findRecipeSvc(id);
    res.status(httpCodes.HTTP_OK).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const recipe = req.body;
  try {
    const updatedRecipe = await recipesServices.updateRecipeSvc(
      id,
      recipe,
      user,
    );
    res.status(httpCodes.HTTP_OK).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  try {
    await recipesServices.deleteRecipeSvc(id, user);
    res.status(httpCodes.HTTP_NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

exports.updateImage = [
  upload.single('image'),
  async (req, res, next) => {
    const { user, file: { filename, path } } = req;
    const { id: recipeId } = req.params;
    try {
      await recipesServices.updateRecipeSvc(
        recipeId,
        { imagePath: path, image: `localhost:3000/src/uploads/${filename}` },
        user,
      );
      const updatedRecipe = await recipesServices.findRecipeSvc(recipeId);
      res.status(httpCodes.HTTP_OK).json(updatedRecipe);
    } catch (error) {
      next(error);
    }
  },
];
