const recipesModel = require('../models/recipes');

module.exports = async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  try {
    const recipe = await recipesModel.uploadImage({ id, image });
    return res.status(200).json(recipe); 
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ops.. Something went wrong', error: err.message });
  }
};