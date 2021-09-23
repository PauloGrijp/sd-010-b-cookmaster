const express = require('express');
// const path = require('path');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

const router = express.Router();
const statusCode = require('http-status-codes');
const recipeService = require('../services/recipeService');
const recipesModel = require('../models/recipesModel');
const validateJWT = require('../middlewares/validateJWT');

router.post('/', validateJWT, async (req, res) => {
	const { name, ingredients, preparation } = req.body;
	const { _id: id } = req.user;
	const recipe = await recipeService.create({ name, ingredients, preparation });
	const { _id } = recipe;

	if (recipe.message === 'Invalid entries. Try again.') {
		return res.status(statusCode.BAD_REQUEST).json(
			{ message: recipe.message },
		);
	} 
	return res.status(statusCode.CREATED).json({ recipe: 
        { name, ingredients, preparation, userId: id, _id } });
}); 

router.get('/', async (_req, res) => {
	const recipeList = await recipesModel.getAll();
	return res.status(statusCode.OK).json(recipeList);
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const recipe = await recipeService.getById(id);
	if (recipe.message) {
		return res.status(statusCode.NOT_FOUND).json({ message: recipe.message });
	}
	return res.status(statusCode.OK).json(recipe);
});

router.put('/:id', validateJWT, async (req, res) => {
	const { name, ingredients, preparation } = req.body;
	const { id } = req.params;
	const { _id } = await recipesModel.getById(id);
	await recipesModel.update({ id, name, ingredients, preparation });
	return res.status(statusCode.OK).json({ _id: id, name, ingredients, preparation, userId: _id });
}); 

router.delete('/:id', validateJWT, async (req, res) => {
	const { id } = req.params;
	await recipesModel.exclude(id);
	return res.status(statusCode.NO_CONTENT).json();
});

const storage = multer.diskStorage({
	destination: (_req, file, callback) => {
		console.log(file);
		callback(null, './src/uploads');
	},
	filename: (req, file, callback) => {
		// VALIDAÇÃO AQUI
		const { id } = req.params;
		callback(null, `${id}.jpeg`);
	},
});
  
  const upload = multer({ storage });
  const stream = fs.createReadStream('./padariana.jpeg'); 
  
  const formInfo = new FormData();
  formInfo.append('file', stream);
  const formHeader = formInfo.getHeaders(); 

router.put('/recipes/:id/image/', validateJWT, upload.single('file'), async (req, res) => {
	const { id } = req.params;
	const { file } = req.file;
	req.headers = formHeader;
	await recipesModel.updateImage(id, file);
	return res.status(200).json({ message: 'Arquivo' });
});
/* const updateImage = async (req, res) => {
  
  // const recipeId = await recipesModel.getById(id);
  await recipesModel.updateImage(id, file);

}; */

module.exports = router;