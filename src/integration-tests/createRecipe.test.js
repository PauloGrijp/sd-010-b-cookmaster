const chai = require("chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const correctToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNTQ1Njk2NjBhYmU1NjcxYWRmOGIxOCIsIm5hbWUiOiJ0ZXN0ZSIsImVtYWlsIjoidGVzdGVAc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTYzMjkxNzE2NCwiZXhwIjoxNjMzMDAzNTY0fQ.JZIjztpMso_qs1mho756EW73QLi3T_kDmaaI6sxsWHU';

const incorrectToken = 'tokenErrado'

describe('POST /recipes', () => {
  let response;

  describe('campo "name" vazio', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', correctToken)
        .send({
          "ingredients": 'varios ingredientes',
          "preparation": 'mistura tudo',
        });
    });

    it('retorna o status 400 - bad request', () => {
      console.log(response.status);
      expect(response).to.have.status(400);
    });

    it('receber a mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('campo "ingredients" vazio', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', correctToken)
        .send({
          "name": 'receita',
          "preparation": 'mistura tudo',
        });
    });

    it('retorna o status 400 - bad request', () => {
      expect(response).to.have.status(400);
    });

    it('receber a mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('campo "preparation" vazio', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', correctToken)
        .send({
          "name": 'receita',
          "ingredients": 'abacate e tomate',
        });
    });

    it('retorna o status 400 - bad request', () => {
      expect(response).to.have.status(400);
    });

    it('receber a mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando o token é inválido', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', incorrectToken)
        .send({
          "name": 'receita',
          "ingredients": 'abacate e tomate',
          "preparation": 'mistura tudo'
        });
    });

    it('retorna o status 400 - bad request', () => {
      expect(response).to.have.status(401);
    });

    it('receber a mensagem "jwt malformed"', () => {
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });

  describe('cria uma receita com sucesso', () => {
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient
        .connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', correctToken)
        .send({
          "name": 'receita',
          "ingredients": 'abacate e tomate',
          "preparation": 'mistura tudo'
        });
    });

    after(() => {
      MongoClient.connect.restore();
      DBServer.stop();
    });

    it('retorna o status 201 - created', () => {
      expect(response).to.have.status(201);
    });

    it('recebe um objeto com as keys name, ingredients, preparation, userId e _id', () => {
      expect(response.body.recipe).to.have.keys('name', 'ingredients', 'preparation', 'userId', '_id');
    });
  });
});