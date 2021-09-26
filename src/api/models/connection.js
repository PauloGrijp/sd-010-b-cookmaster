const { MongoClient } = require('mongodb');

const URL = 'mongodb://mongodb:27017/Cookmaster';
const DB = 'Cookmaster';

const connection = () =>
  MongoClient.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB))
    .catch((err) => {
      console.log(err);
      process.exit();
    });

module.exports = connection;
