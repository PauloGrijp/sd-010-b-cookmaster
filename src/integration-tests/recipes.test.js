const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {expect} = chai
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const server = require('../api/app');


describe('POST /recipes', () => {
  
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando cria a receita sem token', () => {});

  describe('Quando o token enviado é inválido', () => {

    let response = {}

    before(async () => {
      response = await chai.request(server).post('/recipes')
      .set('authorization', 'tokenInvalido')
      .send({
        name: 'banana',
        ingredients: 'banana',
        preparation: 'banana'
      });
    });

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto retorna uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" retorna "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });
  
  describe('Quando os campos nome, ingredientes e preparo não são passados', () => {});

  describe('Quando a receita é criada com sucesso', () => {});

});