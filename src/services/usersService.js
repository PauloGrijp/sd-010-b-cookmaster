/* const { ObjectId } = require('mongodb'); */
const usersModel = require('../model/usersModel');

const emailAlreadyExists = { message: 'Email already registered' };

const add = async (name, email, password) => {
  const emailExists = await usersModel.userExists(email);
    if (emailExists) return emailAlreadyExists;
  const addUser = await usersModel.add(name, email, password);
  return addUser;
};

module.exports = { add };

/* use ('Cookmaster');
db.users.insertOne([
  { "name" : "Erick Jacquin", "email" : "erickjacquin@gmail.com", "password" : "12345678", "role" : "user" }
]);
db.recipes.insertOne([
{ "name" : "Receita do Jacquin", "ingredients" : "Frango", "preparation" : "10 minutos no forno" }
]); */