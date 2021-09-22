const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const OPTIONS = {
  // useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => MongoClient
    .connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME)) // nome do banco de dados
    .catch((err) => {
      console.error(err);
      process.exit();
    });

  module.exports = connection;