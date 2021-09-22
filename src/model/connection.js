const { MongoClient } = require('mongodb');

// Conexão para testes locais.
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Conexão para testes no git.
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = async () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((conn) => conn.db(DB_NAME));

module.exports = { connection };