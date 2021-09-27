const { MongoClient } = require('mongodb');

/* Remoto */
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
const DB_CONFIG = { useNewUrlParser: true, useUnifiedTopology: true };

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, DB_CONFIG)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

module.exports = connection;
