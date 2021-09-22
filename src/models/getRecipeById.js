const { getConnection } = require('./connection');

const getRecipeById = (id) => getConnection()
.then((db) => db.collection('recipes')
.findOne({ id }));

module.exports = getRecipeById;