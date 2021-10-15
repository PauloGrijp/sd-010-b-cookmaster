const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URL = process.env.DB_URL || 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

const connection = (URL = MONGO_DB_URL) => MongoClient
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,        
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
    });

module.exports = { connection };
