require("dotenv").config();
const mongodb = require("mongo-mock");
mongodb.max_delay = 0;
const MongoClient = mongodb.MongoClient;

const url = process.env.DB_URL;
let db;
MongoClient.connect(url, {}, function (err, client) {
  db = client.db();
  function cleanup() {
    var state = collection.toJSON();""
    state.documents.push({ a: 2 });
    state.documents.length = 0;
    db.close();
  }

  setTimeout(cleanup, 1000);
});
class MockedMongo {
  async main() {
    this.db = db;
  }
}

module.exports = new MockedMongo();
