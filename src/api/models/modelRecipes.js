const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = async () => connection()
  .then((db) => db.collection('recipes'));

const create = async (name, ingredients, preparation, userId) => collection()
  .then((col) => col.insertOne({ name, ingredients, preparation, userId }));

const getAll = async () => collection()
  .then((col) => col.find().toArray());

const getById = async (id) => collection()
  .then((col) => col.findOne(ObjectId(id)));

module.exports = { create, getAll, getById };
