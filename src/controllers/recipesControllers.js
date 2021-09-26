const jwt = require('jsonwebtoken');

const recipeModel = require('../models/recipesModel');

const secret = 'programadorNaoTemFeriadoNemFinalDeSemana';

const message = {
    NotFound: 'recipe not found',
};

const STATUS_OK = {
    OK: 200,
    Created: 201,
    noContent: 204,
    
};

const STATUS_ERROR = {
    NotFound: 404,
};

const recipeRegistration = async (req, res) => {
    // Campos da Receita!
    const token = req.headers.authorization;
    const { name, ingredients, preparation } = req.body;
    // descriptografia do token
    const { data: { _id } } = jwt.verify(token, secret);
    const recipeCreated = await recipeModel.createNewRecipe(name, ingredients, preparation, _id);
    
   return res.status(STATUS_OK.Created).json({ recipe: recipeCreated });
};

const findAllRecipes = async (req, res) => {
    // Campos da Receita!
    const allRecipes = await recipeModel.findAllRecipes();
    
   return res.status(STATUS_OK.OK).json(allRecipes);
};

const findRecipeById = async (req, res) => {
    // Campos da Receita!
    const { id } = req.params;
    const recipe = await recipeModel.findRecipeById(id);
    if (recipe === null) {
        return res.status(STATUS_ERROR.NotFound).json({ message: message.NotFound });
    }
    
   return res.status(STATUS_OK.OK).json(recipe);
};

// updateByid
const updateByid = async (req, res) => {
   const { name, ingredients, preparation } = req.body;
   const { id } = req.params;
   const updateRecipe = await recipeModel.updateRecipeByid(name, ingredients, preparation, id);
   const { _id } = updateRecipe;
   // criando uma edição sem sentido algum porém, nos jogamos os jogo nao fazemos as regras
   const edit = {
        _id,
       name: `${updateRecipe.name} editado`,
       ingredients: `${updateRecipe.ingredients} editado`,
       preparation: `${updateRecipe.preparation} editado`,
       userId: updateRecipe.userId,
   };

   return res.status(STATUS_OK.OK).json(edit);
};

// deleteByid

const deleteByid = async (req, res) => {
    await recipeModel.deleteRecipeByid;
   
    return res.status(STATUS_OK.noContent).json();
 };

 const updateImageById = async (req, res) => {
    const { id } = req.params;
    console.log(req.file.path, 'quero fazer o update da imagem posso?');
    const imagePath = `localhost:3000/${req.file.path}`;
    console.log(imagePath, 'estou para enviar a url');
    await recipeModel.imageUpload(id, imagePath);
    const recipeWithImage = await recipeModel.findRecipeById(id);
    console.log(recipeWithImage);
 
    return res.status(STATUS_OK.OK).json(recipeWithImage);
 };

// 

module.exports = {
    recipeRegistration,
    findAllRecipes,
    findRecipeById,
    updateByid,
    deleteByid,
    updateImageById,
};