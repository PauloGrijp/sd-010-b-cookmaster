const chai = require("chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const recipes = [
  {
    name: 'receita2',
    ingredients: 'ingredientes 2',
    preparation: 'mistura2',
    userId: 'userId2',
    _id: 'id2'
  },
  {
    name: 'receita1',
    ingredients: 'ingredientes 1',
    preparation: 'mistura1',
    userId: 'userId1',
    _id: 'id1'
  }
]

describe('GET /recipes', () => {
  let response;

  describe('retorna todas as receitas do banco', () => {
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient
        .connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});

      await connectionMock.db('Cookmaster').collection('recipes').insertMany(recipes);
      const newRecipes = await connectionMock.db('Cookmaster').collection('recipes').find().toArray();
      console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiiii', newRecipes);
      response = await chai.request(server)
        .get('/recipes');
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna o status 200 - ok', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array com duas receitas', () => {
      expect(response.body).to.be.an('array');
    });

    it('o array possuí dois objetos', () => {
      expect(response.body.length).to.be.equal(2);
    });
  });


});