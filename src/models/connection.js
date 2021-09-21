const { MongoClient } = require('mongodb');

// conexão local com o banco pra rodar os testes locais
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// conexão do banco para rodar o avaliador no github.
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => {
  MongoClient
    .connect(MONGO_DB_URL, options)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

module.exports = {
  connection,
};
