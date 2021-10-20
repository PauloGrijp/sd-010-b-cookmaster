const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = `mongodb://mongodb:27017/${DB_NAME}`;
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () =>
  db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db('Cookmaster');
        return db;
      });

module.exports = connection;
