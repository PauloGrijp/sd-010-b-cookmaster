const { MongoClient } = require('mongodb');

// require('dotenv').config();

// const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';

// const DB_NAME = process.env.DB_NAME || 'Cookmaster';

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,        
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
    });

module.exports = { connection };
