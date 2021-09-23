const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Para rodar o Banco de Dados na máquina
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Para rodar os testes.
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let db = null;
const connection = async () => {
  try {
    if (db) return Promise.resolve(db);
    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = conn.db(DB_NAME);
    return db;
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
