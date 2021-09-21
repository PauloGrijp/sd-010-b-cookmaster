require('dotenv').config();
const { MongoClient } = require('mongodb');

let schema = null;

const MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://mongodb:27017/Cookmaster';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = 'Cookmaster';

const connection = async () => (schema ? Promise.resolve(schema) : (
    MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((mongo) => mongo.db(DB_NAME))
    .then((db) => {
      schema = db;
      return schema;
  })));

module.exports = {
  connection,
};