const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();

const connectDb = async () => {
    const URLMock = await DBServer.getUri();
    return MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = {connectDb}

// after(async () => {
//   MongoClient.connect.restore();
//   await DBServer.stop();
// });
