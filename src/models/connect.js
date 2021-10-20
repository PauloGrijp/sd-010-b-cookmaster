const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DBNAME = 'Cookmaster';

let db = null;

const connection = async () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DBNAME);
        return db;
      });
};

module.exports = connection;