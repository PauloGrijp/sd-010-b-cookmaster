const Db = require("mongodb/lib/db");

// colocar query do MongoDB
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });