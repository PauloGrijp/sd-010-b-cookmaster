const { MongoClient } = require('mongodb');

// conexão local com o banco para testes locais
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// conexão do banco para rodar o avaliador no git hub
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => MongoClient.connect(MONGO_DB_URL, options)
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

  module.exports = {
    connection,
  };
