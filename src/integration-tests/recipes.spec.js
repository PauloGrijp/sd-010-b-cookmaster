const MongoClient = require('mongodb/lib/mongo_client');
const sinon = require('sinon')
const chai = require('chai');

const { getConnection } = require('./connectionMock');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app')
// EXEMPLO DE CONECÇÃO BANCO

// let connectionMock;
// before(async () => {
//   connectionMock = await getConnection();
//   sinon.stub(MongoClient, 'connect').resolves(connectionMock);
// });

// after(() => {
//   MongoClient.connect.restore();
// })

// REQUEST 

// let response; 

// before(async () => {
//   response = await chai.request(app)
//     .post('/users')
//     .send({})
// })

// expect(response.body)...

//GET TOKEN 

// let respons;
// before(async() => {
//   const token = await chai.request(app).post('/login').send({user}).then((response) => response.token)

// response = await chai.request(app).get('/login').set('authorization', token)
// })

describe.skip('POST /recipes', () => {
  describe.skip('Não é possível cadastrar uma receita com token invalido', () => { });
  describe.skip('Não é possível cadastrar uma receita sem name, ingredients ou preparation', () => { });
  describe.skip('É possível cadastrar uma receita com sucesso', () => { });
});
describe.skip('GET /recipes', () => {
  describe.skip('É possivel listar todas as receitas', () => { })
});
describe.skip('GET /recipes/:id', () => {
  describe.skip('Não é possível listar uma receita que não existe', () => { })
  describe.skip('É possível listar uma receita com sucesso', () => { })
});
describe.skip('PUT /recipes/:id', () => {
  describe.skip('Não é possível editar uma receita com token invalido', () => { });
  describe.skip('Não é possível editar uma receita sem estar autenticado', () => { });
  describe.skip('é possível editar uma receita', () => { });
});
describe.skip('DELETE /recipes/:id', () => {
  describe.skip('Não é possível editar uma receita sem estar autenticado', () => { });
  describe.skip('é possível deletar uma receita', () => { });
});
describe.skip('PUT /recipes/:id/image', () => {
  describe.skip('Não é possível adicionar imagem a receita sem estar autenticado', () => { });
  describe.skip('É possível adicionar imagem a receita com sucesso', () => { });

});