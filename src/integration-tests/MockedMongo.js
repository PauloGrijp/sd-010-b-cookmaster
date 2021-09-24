require("dotenv").config();
const mongodb = require("mongo-mock");
mongodb.max_delay = 0;
const MongoClient = mongodb.MongoClient;

const url = process.env.DB_URL;
let db;
MongoClient.connect(url, {}, function (err, client) {
  db = client.db();
  // Get the documents collection
});
class MockedMongo {
  async main() {
    this.db = db;
  }
}

module.exports = new MockedMongo();
