const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let connection = null;

const getConnection = async () => {
  connection = connection
    || (await MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => conn.db(DB_NAME)));
  return connection;
};

// function connection() {
//   return db
//     ? Promise.resolve(db)
//     : MongoClient.connect(MONGO_DB_URL, OPTIONS)
//       .then((conn) => {
//         db = conn.db(DB_NAME);
//         return db;
//       });
// }

module.exports = { getConnection };