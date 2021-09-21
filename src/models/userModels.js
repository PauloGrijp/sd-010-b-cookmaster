const connect = require('./connection');

const creatUser = async ({ name, email, password, role }) => {
  const db = await connect();
  const { insertedId: id } = await db.collection().insertOne({ name, email, password, role });
  return { id, name, email, password, role };
};

module.exports = {
  creatUser,
};
