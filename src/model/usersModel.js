/* const { ObjectId } = require('mongodb'); */
const connect = require('./connection');

const userExists = async (email) => {
  const db = await connect();
  const nameUser = await db.collection('users').findOne({ email });

  return nameUser;
};

const add = async (name, email, password) => {
  const db = await connect();
  const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return {
  user: { _id: user.insertedId,
    name: user.ops[0].name,
    email: user.ops[0].email,
    role: user.ops[0].role,
  },
};
};

/* const getAll = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();
  return { products };
};

const productExists = async (name) => {
  const db = await connect();
  const nameProduct = await db.collection('products').findOne({ name });

  return nameProduct !== null;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const productId = await db.collection('products').findOne({ _id: ObjectId(id) });
  return productId;
};

const update = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { id, name, quantity };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const deleteProduct = await db.collection('products').findOne({ _id: ObjectId(id) });
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return deleteProduct;
}; */

module.exports = { add, userExists };