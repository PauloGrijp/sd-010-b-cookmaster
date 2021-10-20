const { MongoClient } = require('mongodb');

const MONGO_DB = 'mongodb://localhost:27017/Cookmaster';
// const MONGO_DB = 'mongodb://mongodb:27017Cookmaster';
const NAME_DB = 'Cookmaster';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () =>
  MongoClient.connect(MONGO_DB, OPTIONS)
    .then((conn) => conn.db(NAME_DB));

module.exports = connection;