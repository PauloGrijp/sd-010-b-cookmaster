const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const server = require('../api/app');

const { getConnection } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa a criação de um novo usuário', function () {
  describe('quando criado com sucesso', function () {
    describe('a resposta', function () {
      const userRequest = {
        name: 'Carl Sagan',
        email: 'sagan@nasa.com',
        password: 'stardust',
      };

      let response;

      before(async function () {
        const mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        response = await chai.request(server).post('/users').send(userRequest);
      });

      after(function () {
        MongoClient.connect.restore();
      });

      it('retorna o status 201', function () {
        expect(response).to.have.status(201);
      });

      it('é um objeto', function () {
        expect(response).to.be.an('object');
      });

      it('o objeto contém uma chave "user"', function () {
        expect(response.body).to.have.property('user');
      });

      it('a chave "user" contem as propriedades "name", "email", "role" e "_id"', function () {
        expect(response.body.user).to.have.all.keys('name', 'email', 'role', '_id');
      });

      it('a chave "role" deve possuir o valor "user"', function () {
        expect(response.body.user.role).to.be.equal('user');
      });
    });
  });

  describe('quando o email cadastrado já existe', function () {
    describe('a resposta', function () {
      const userRequest = {
        name: 'Carl Sagan',
        email: 'sagan@nasa.com',
        password: 'stardust',
      };

      let response;
      let mockConnection;

      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(userRequest);
        response = await chai.request(server).post('/users').send(userRequest);
      });

      after(async function () {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status', function () {
        expect(response).to.have.status(409);
      });
      
      it('é um objeto', function () {
        expect(response.body).to.be.an('object');
      });

      it('contém a propriedade "message"', function () {
        expect(response.body).to.have.property('message');       
      });

      it('"message" contém a mensagem de erro "Email already registered', function () {
       expect(response.body.message).to.be.equals('Email already registered');
      });
    });
  });

  describe('quando há algum erro no body da request', function () {
    describe('a resposta', function () {
      const userRequest = {
        name: '',
        email: 'sagannasa.com',
        password: 'stardust',
      };

      let response;
      let mockConnection;

      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        response = await chai.request(server).post('/users').send(userRequest);
      });

      after(async function () {
        MongoClient.connect.restore();
      });

      it('retorna o status 400', function () {
        expect(response).to.have.status(400);
      });

      it('é um objeto', function () {
        expect(response.body).to.be.an('object');
      });

      it('contém a propriedade "message"', function () {
        expect(response.body).to.have.property('message');       
      });

      it('"message" contém a mensagem de erro "Invalid entries. Try again."', function () {
       expect(response.body.message).to.be.equals('Invalid entries. Try again.');
      });
    });
  });
});