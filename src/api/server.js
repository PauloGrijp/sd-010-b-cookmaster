require('dotenv').config();
const Mongo = require('./utils/database/Mongo');
const customExpress = require('./configs/customExpress');

const PORT = 3000;

const startServer = async () => {
  const app = await customExpress(Mongo);
  app.listen(PORT, () => console.log(`listening to port ${PORT}`));
};

startServer();
