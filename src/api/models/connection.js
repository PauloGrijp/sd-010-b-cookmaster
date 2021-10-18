const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster'; /* testes locais */
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster'; /* avaliador */

const DB_NAME = 'Cookmaster';

let db = null;

const getConnection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
        .then((conn) => {
            db = conn.db(DB_NAME);
            return db;
        }));

module.exports = { getConnection };
