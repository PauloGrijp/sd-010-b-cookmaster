// colocar query do MongoDB
/* const mongoConnection = require('./connection');
const loginCollection = await mongoConnection.getConnection() */
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });

/* module.exports = root; */
