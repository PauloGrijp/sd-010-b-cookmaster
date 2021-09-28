const models = require('../models/recipes');

const authUser = async (req, res, next) => {
  const error = new Error();
  error.err = {
    code: 401,
    mesage: 'missing auth token',
  };

  const { _id, role } = req.user;
  const { id } = req.params;
  const userId = _id;

  const recipe = await models.getById(id);

  if (userId === recipe.userId) next();

  if (role === 'admin') next();

  throw error;
};

module.exports = authUser;
