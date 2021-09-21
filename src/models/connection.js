const mongoClient = require('mongodb').MongoClient;

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = async () => {
  try {
    const conn = await mongoClient.connect(MONGO_DB_URL, OPTIONS);
    return conn.db(DB_NAME);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connection;