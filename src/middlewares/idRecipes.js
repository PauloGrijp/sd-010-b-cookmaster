const idRecipesCheck = (req, res, next) => {
    const { id } = req.params;

    if (!id || id.length < 24 || id === null) {
        return res.status(404).json({
            message: 'recipe not found',
          });
        }
    next();
};

module.exports = { idRecipesCheck };