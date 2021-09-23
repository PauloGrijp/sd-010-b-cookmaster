const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app')
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

const usuárioValido = {
  name: 'Erick Jacquin',
  email: 'erickjacquin@gmail.com',
  password: '12345678'
}

const usuárioInvalido = {
  name: 'Henrique Fogaça', 
  email: 'erickjacquin@gmail.com',
  password: '123456789'
}

describe('1 - POST /users/', () => {
  
  describe('1.1 - validando entradas', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users/').send({});
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    })

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" deve possuir o texto "Invalid entries. Try again."',() => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
    
  });
  describe('1.2 - Email invalido', () => {
    const DBServer = new MongoMemoryServer();
    let response;

    before(async() => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
        await connectionMock.db('Cookmaster').collection('users').insertOne(usuárioValido);

      response = await chai.request(server).post('/users/').send(usuárioInvalido);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Retorna o status 409', () => {
      expect(response).to.have.status(409)
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" deve possuir o texto "Email already registered"',() => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
});
