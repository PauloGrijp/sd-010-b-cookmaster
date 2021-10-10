const chai = require("chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let response;

  describe('campo "email" vazio', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/login');
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna a mensagem "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('campo passwrod vazio', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/login');
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna a mensagem "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('campo email incorreto', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({ email: 'email@em', password: 'blablabla' });
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna a mensagem "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('campo senha incorreto', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({
          name: 'teste',
          email: 'teste@teste.com',
          password: 'minhasenha',
        });

      response = await chai.request(server)
        .post('/login')
        .send({ email: 'teste@teste.com', password: 'minhasha' });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna a mensagem "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('é possível fazer login com sucesso', () => {
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({
          name: 'teste',
          email: 'teste@teste2.com',
          password: 'minhasenha',
        });

      response = await chai.request(server)
        .post('/login')
        .send({ email: 'teste@teste2.com', password: 'minhasenha' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').drop();
    });

    it('retorna o status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um token', () => {
      expect(response.body).to.have.key('token');
    });
  });
});