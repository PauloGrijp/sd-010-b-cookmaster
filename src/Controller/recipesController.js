const path = require('path');
const recipesService = require('../Service/recipesService');

const getAll = async (req, res) => {
    try {
        const users = await recipesService.getAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: ' catch ' });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        if (id.length < 24) {
            return res.status(404).json({ message: 'recipe not found' });
        }
        const recipe = await recipesService.getById(id);
        return res.status(200).json(recipe);
    } catch (error) {
        return res.status(500).json({ message: 'bugou ' });
    }
};

const createRecipe = async (req, res) => {
    try {
        const { users: { _id } } = req.user;
        // name, email, role tem disponivel no req.user
        const result = await recipesService.createRecipe(req.body, _id);
        //   console.log(result);
        if (result === false) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }
        return res.status(201).json({ recipe: result });
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const { users: { _id } } = req.user;
        const idRecipe = req.params.id;
        // console.log(req.user);
        // name, email, role tem disponivel no req.user
        const result = await recipesService.updateRecipe(req.body, _id, idRecipe);
        //  console.log(result);
        if (result === false) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const deleteRecipe = async (req, res) => {
    const idRecipe = req.params.id;
    const { users } = req.user;
    if (idRecipe.length < 24) {
        return res.status(422).json({
            err: { code: 'invalid_data', message: 'Wrong sale ID format' },
        });
    }
    try {
        const result = await recipesService.deleteRecipe(idRecipe, users);
        if (!result) {
            return res.status(422).json({
                err: { code: 'invalid_data', message: 'Wrong sale ID format' },
            });
        }
        return res.status(204).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const uploadPicture = async (req, res) => {
    const { id } = req.params;

    const picture = path.join('localhost:3000', 'src', 'uploads', `${id}.jpeg`);
    try {
        const result = await recipesService.uploadPicture(id, picture);
         console.log('result', result);
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(200).json({ result: 'ok' });
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { createRecipe, getAll, getById, updateRecipe, deleteRecipe, uploadPicture };