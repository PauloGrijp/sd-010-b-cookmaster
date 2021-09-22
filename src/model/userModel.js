const connection = require('./connection');

// Aqui faremos o CRUD! Deletaremos, criaremos e atualizamos todas informações do nosso banco
// O model é responsável por manipular o banco de dados

// Find para não duplicar o banco de dados
// Aqui estou manipulando e criando um produto!
const addUser = async (name, email, role) => {
    const db = await connection();
    const user = await db.collection('users').insertOne({ user: { name, email, role } });
    return user.ops[0];
};

module.exports = {
    addUser,
};