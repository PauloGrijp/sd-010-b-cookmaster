require("dotenv").config();
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

class MockedMongo {
  constructor() {
    this.dbServer = new MongoMemoryServer();

    this.stopMongoServer = this.stopMongoServer.bind(this);
  }

  async main() {
    const DBServer = this.dbServer;

    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, "connect").resolves(connectionMock);
    const db = connectionMock.db("test");

    this.db = db;
  }

  async stopMongoServer() {
    MongoClient.connect.restore();
    await this.dbServer.stop();
  }
}

module.exports = new MockedMongo();
