const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// local
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
let DB = null;

// github
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = () => (DB ? Promise.resolve(DB)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    DB = conn.db(DB_NAME);
    return DB;
    }));

module.exports = connection;
