require('dotenv').config();

const customExpress = require('./configs/customExpress');

const PORT = 3000;

const startServer = async () => {
  const app = await customExpress();
  app.listen(PORT, () => console.log(`listening to port ${PORT}`));
};

startServer();
