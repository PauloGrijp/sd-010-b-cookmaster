const { mongo } = require('mongodb');
require('dotenv').config();

const dbURL = 'mongodb://mongodb:27017/Cookmaster' || process.env.dbURL;
const dbNAME = 'Cookmaster';
let CookieMonster = null; // My stablished connection || null

// db related options
const mongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// func to stablish conn
const dbCaller = () => (CookieMonster 
    ? Promise.resolve(CookieMonster) : mongo.connect(dbURL, mongoose).then((conn) => { 
        CookieMonster = conn.CookieMonster(dbNAME);
        return CookieMonster;
}));

module.exports = dbCaller;
