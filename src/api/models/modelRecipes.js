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

const updateById = async (id, name, ingredients, preparation) => collection()
  .then((col) => col.updateOne({ _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } }));

const deleteById = async (id) => collection()
  .then((col) => col.deleteOne({ _id: ObjectId(id) }));

const addUrlImage = (id, image) => collection()
  .then((col) => col.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image } },
    { returnOriginal: false },
  ));

module.exports = { create, getAll, getById, updateById, deleteById, addUrlImage };
