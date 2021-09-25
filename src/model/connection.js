const { MongoClient } = require('mongodb');

// Conexão para testes locais.
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Conexão para testes no git.
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let db = null;

const connection = async () => (
  db 
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  })
); 

module.exports = { connection };