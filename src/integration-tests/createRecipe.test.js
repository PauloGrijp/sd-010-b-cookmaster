const chai = require("chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

const correctToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNjJmNWQ3NjdmMzVmNDU3NGVkOTBhZCIsIm5hbWUiOiJtYXJjb3MiLCJlbWFpbCI6Im1hcmNvc0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE2MzM4NzU0MTksImV4cCI6MTYzMzk2MTgxOX0.w-zrA_nQ9EZFn5y7hmodgHE6ofTUk_HazvCJjTJDozM';

const incorrectToken = 'incorrectToken'

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
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();

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

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('recipes').drop();
    });

    it('retorna o status 201 - created', () => {
      expect(response).to.have.status(201);
    });

    it('recebe um objeto com as keys name, ingredients, preparation, userId e _id', () => {
      expect(response.body.recipe).to.have.keys('name', 'ingredients', 'preparation', 'userId', '_id');
    });
  });
});