const chai = require("chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;
const id = '61620a8aacb5265a9a577507'

const recipe = {
  name: 'receita1',
  ingredients: 'ingredientes 1',
  preparation: 'mistura1',
  userId: 'userId1',
  _id: ObjectId(id),
}


describe('GET /recipes', () => {
  let response;

  describe('retorna todas as receitas do banco', () => {
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(recipe);

      response = await chai.request(server)
        .get(`/recipes/${id}`);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('recipes').drop();
    });

    it('retorna o status 200 - ok', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possuí as propriedades "name", "ingredients", "preparation", "userId" e "_id"', () => {
      expect(response.body).to.have.keys('name', 'ingredients', 'preparation', 'userId', '_id');
    });
  });
});