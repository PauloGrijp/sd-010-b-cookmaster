const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

let db = null;

const OPTIONS = {
  useNewUrlParser: true,
  useInifiedTopolofy: true,
}

const connection = () => ( db ? 
  Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((connect) => {
    db = connect.db(DB_NAME);
    return db;
  }));

module.exports = connection;