const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const getRecipeById = (id) => getConnection()
.then((db) => db.collection('recipes')
.findOne({ _id: ObjectId(id) }))
.catch(() => false);

module.exports = getRecipeById;