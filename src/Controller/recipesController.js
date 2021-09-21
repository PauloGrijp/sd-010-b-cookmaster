const recipesService = require('../Service/recipesService');

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
module.exports = { createRecipe };