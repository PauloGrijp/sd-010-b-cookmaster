const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

const mongod = new MongoMemoryServer();

const getConnection = async () => {
  const uriMock = await mongod.getUri();

  return MongoClient.connect(uriMock, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = { getConnection };
