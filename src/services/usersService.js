/* const { ObjectId } = require('mongodb'); */
const usersModel = require('../model/usersModel');

const emailAlreadyExists = { message: 'Email already registered' };

/* const quantityLargerError = { err:
  { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };

const mustBeANumbererror = { err:
  { code: 'invalid_data', message: '"quantity" must be a number' } };

const productAlreadyExistsError = { err:
  { code: 'invalid_data', message: 'Product already exists' } };

  const formatError = { err:
    { code: 'invalid_data', message: 'Wrong id format' } };

const getById = (id) => {
  if (!ObjectId.isValid(id)) return formatError;
  return productModel.getById(id);
}; */

const add = async (name, email, password) => {
  const emailExists = await usersModel.userExists(email);
    if (emailExists) return emailAlreadyExists;
  const addUser = await usersModel.add(name, email, password);
  return addUser;
};

/* const update = async ({ id, name, quantity }) => {
  const productExists = await productModel.getById(id);
  if (!productExists) return formatError;
  if (name.length < 5) return lengthError;
  if (quantity < 1) return quantityLargerError;
  if (typeof quantity !== 'number') return mustBeANumbererror;
  return productModel.update({ id, name, quantity });
};

const remove = async (id) => {
  const productExists = await productModel.getById(id);
  if (!productExists) return formatError;
  return productModel.remove(id);
}; */

module.exports = { add };

/* use ('Cookmaster');
db.users.insertOne([
  { "name" : "Erick Jacquin", "email" : "erickjacquin@gmail.com", "password" : "12345678", "role" : "user" }
]);
db.recipes.insertOne([
{ "name" : "Receita do Jacquin", "ingredients" : "Frango", "preparation" : "10 minutos no forno" }
]); */