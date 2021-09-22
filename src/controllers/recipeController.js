const statusCode = require('http-status-codes');
const recipeService = require('../services/recipeService');
const recipesModel = require('../models/recipesModel');

const create = async (req, res) => {
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
};

const getAll = async (_req, res) => {
	const recipeList = await recipesModel.getAll();
	return res.status(statusCode.OK).json(recipeList);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const recipe = await recipeService.getById(id);
	if (recipe.message) {
		return res.status(statusCode.NOT_FOUND).json({ message: recipe.message });
	}
	return res.status(statusCode.OK).json(recipe);
};

const update = async (req, res) => {
	const { name, ingredients, preparation } = req.body;
	const { id } = req.params;
	const { _id } = await recipesModel.getById(id);
	/* console.log(userId); */
/* 	const { userId } = req.user;
	console.log(req.user); */
	await recipesModel.update({ id, name, ingredients, preparation });
	return res.status(statusCode.OK).json({ _id: id, name, ingredients, preparation, userId: _id });
};

module.exports = { create, getAll, getById, update };