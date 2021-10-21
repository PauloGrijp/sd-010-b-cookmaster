const chai = require("chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

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

describe('GET /recipes/:id', () => {
  let response;

  describe('retorna todas as receitas do banco', () => {
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').insertMany(recipes);

      response = await chai.request(server)
        .get('/recipes');
    });

    after(async () => {
      MongoClient.connect.restore();
      // await connectionMock.db('Cookmaster').collection('recipes').drop();
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