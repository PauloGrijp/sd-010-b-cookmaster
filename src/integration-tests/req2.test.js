const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const server = require('../api/app');

const { getConnection } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa o endpoint para Login de usuários', function () {
  describe('quando o login é efetuado com sucesso', function () {
    describe('a resposta', function () {
      const user = {
        name: 'Carl Sagan',
        email: 'sagan@nasa.com',
        password: 'stardust',
      };

      const { name: _, ...userLogInfo } = user;
      let response;
      let mockConnection;

      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        response = await chai.request(server).post('/login').send(userLogInfo);
      });

      after(async function () {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 200', function () {
       expect(response).to.have.status(200);
      });

      it('retorna um objeto', function () {
        expect(response).to.be.an('object');      
      });

      it('o objeto contém a chave "token"', function () {
       expect(response.body).to.have.property('token');
      });
    });
  });

  describe('quando "email" ou "password" não são informados', function () {
    describe('a resposta', function () {
      let response;
      let mockConnection;

      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        response = await chai.request(server).post('/login').send({});
      });

      after(async function () {
        MongoClient.connect.restore();
      });

      it('retorna o status 401', function () {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', function () {
        expect(response).to.be.an('object');
      });

      it('contém uma propriedade "message"', function () {
        expect(response.body).to.have.property('message');
      });

      it('"message" possui o valor "All fields must be filled"', function () {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });
  });

  describe('quando usuário não encontrado ou password inválido', function () {
    describe('a resposta', function () {
      const user = {
        name: 'Carl Sagan',
        email: 'sagan@nasa.com',
        password: 'stardust',
      };

      const notValidInfo = {
        email: 'not@found.com',
        password: 'not_found',
      };

      let response;
      let mockConnection;

      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        response = await chai.request(server).post('/login').send(notValidInfo);
      });

      after(async function () {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        MongoClient.connect.restore();
      });
      it('retorna o status 401', function () {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', function () {
        expect(response).to.be.an('object');
      });

      it('objeto contém a chave "message"', function () {
        expect(response.body).to.have.property('message');
      });

      it('"message" possui o valor "Incorrect username or password"', function () {
        expect(response.body.message).to.be.equal('Incorrect username or password');
      });
    });
  });
});