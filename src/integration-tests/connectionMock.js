const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const dbConnect = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS);
};

const dbDisconnect = async () => {
  await MongoClient.connect.restore();
  // await DBServer.stop();
};

module.exports = { dbConnect, dbDisconnect };
