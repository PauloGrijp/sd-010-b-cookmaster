// describe('', () => {
// });
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const server = require('../api/app');

const {user} = require('./mockData')

describe('Testes para a estrutura do /users', () => {
  describe('Testando a criação de usuario', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      response = await chai.request(server)
        .post('/users')
        .send({name, email, password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retornando status 201', () => {
      expect(response).to.have.status(201);
    });

    it('O objeto tem a propriedade USER', () => {
      expect(response.body).to.have.property('user');
    });

    it('O objeto retornado não esta vazio', () => {
      expect(response.body).to.be.not.empty;
    });
  })
})

describe('Testes para a estrutura do /users', () => {
  describe('Testando quando um usuario ja existe', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      response = await chai.request(server)
        .post('/users')
        .send({name, email, password});
      response = await chai.request(server)
        .post('/users')
        .send({name, email, password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retornando status 409', () => {
      expect(response).to.have.status(409);
    });

    it('O objeto tem a propriedade MESSAGE', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "MESSAGE" retorna "Email já registrado"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  })
})

describe('Testes para a estrutura do /users', () => {
  describe('Quando o usuario não é fornecido', () => {
    let connectionMock;

    before(async () => {
      const {email, password} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      response = await chai.request(server)
        .post('/users')
        .send({email, password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Retornando status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto no corpo', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto tem a propriedade MESSAGE', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "MESSAGE" retorna "Entrada invalida, tente novamente"', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  })
})

describe('Testes para a estrutura do /login', () => {
  describe('Usuario logando com sucesso', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').insertOne({name, email, password, role });
      response = await chai.request(server)
        .post('/login')
        .send({email, password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Restornando status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto no corpo', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto tem a propriedade TOKEN', () => {
      expect(response.body).to.have.property('token');
    });

    it('O objeto retornado no corpo não esta vazio', () => {
      expect(response.body).to.be.not.empty;
    });
  })
})
