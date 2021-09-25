const path = require('path');
const { ModelAllRecipes } = require('../models/recipes');
const {
  servUpdater,
  servEraser,
  servRecipes,
  servListByID,
  servImageCreate,
} = require('../services/recipes');
const uploadImage = require('../middleware/image');

const contUpdate = async (req, res) => {
const { id } = req.params;
const { name, ingredients, preparation } = req.body;
const tokenReceived = req.headers.authorization;
  const result = await servUpdater({ id, name, ingredients, preparation }, tokenReceived);  
  if (result.err) {
    const { code, err } = result;
    return res.status(code).json(err);
  }
    const { code, recipe } = result;
  return res.status(code).json(recipe);
};

const contEraser = async (req, res) => {
  const { id } = req.params;
  const tokenReceived = req.headers.authorization;
 const result = await servEraser(id, tokenReceived);
 if (result.err) {
  const { code, err } = result;
  return res.status(code).json(err);
}
const { code, recipe } = result;
return res.status(code).json(recipe);
};

const contRecipes = async (req, res) => {
  const recipes = req.body;
  const tokenReceived = req.headers.authorization;
  const result = await servRecipes(recipes, tokenReceived);
    if (result.err) {
      const { code, err } = result;
      return res.status(code).json(err);
    }
    const { code, recipe } = result;
 return res.status(code).json({ recipe });
};

const contListRecipes = async (req, res) => {
  const result = await ModelAllRecipes();
  const { code, allRecipes } = result;
  return res.status(code).json(allRecipes);
};

const contListByID = async (req, res) => {
  const { id } = req.params;
 const result = await servListByID(id);
 if (result.err) {
  const { code, err } = result;
  return res.status(code).json(err);
}
const { code, recipe } = result;
return res.status(code).json(recipe);
};

// tive a ajuda da Camila Arruda para a execução do req 9 
const contImageCreate = [uploadImage.single('image'), async (req, res) => {
  const { id } = req.params;
  const tokenReceived = req.headers.authorization;
  const result = await servImageCreate(id,
     tokenReceived,
     path.join('localhost:3000', 'src', 'uploads', `${id}.jpeg`));
  if (result.err) {
    const { code, err } = result;
    return res.status(code).json(err);
  }
  const { code, item } = result;
  console.log(item, 'control');
  return res.status(code).json(item);
}];

module.exports = {
  contUpdate,
  contEraser,
  contRecipes,
  contImageCreate,
  contListRecipes,
  contListByID,
};