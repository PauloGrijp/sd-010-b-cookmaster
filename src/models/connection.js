const { MongoClient } = require('mongodb');

// const OPTIONS = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// url para o avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// url para rodar localmente
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// let db = null;

// const getConnection = async () => (
//   db
//     ? Promise.resolve(db)
//     : MongoClient.connect(MONGO_DB_URL, OPTIONS)
//       .then((conn) => {
//         db = conn.db(DB_NAME);
//         return db;
//       })
// );

let schema = null;

async function getConnection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { getConnection };
