const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server')

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const DBServer = new MongoMemoryServer();

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS);
};

module.exports = { getConnection };
