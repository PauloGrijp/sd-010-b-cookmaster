// Source: Transcrito e adaptado do projeto Store Manager

const { MongoClient } = require('mongodb');

// Dados servidor para AVALIADOR
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// Dados servidor para uso LOCAL
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
    }));

// Exportado entre {} para viabilizar o MOCH nomomento dos testes
module.exports = { connection };