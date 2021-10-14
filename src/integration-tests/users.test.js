const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const app = require('../api/app');
const { getConnection } = require('./connectionMock');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando body não contém name e email', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/users').send();
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com a propriedade message com uma string', () => {
      expect(response.body).to.have.a.property('message').which.is.a('string');
    });

    it('retorna uma mensagem de erro', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

  })

  describe('quando body contém um email que já existe', () => {
    let response;
    let connectionMock;
  
    before(async () => {
      connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await connectionMock.db('Cookmaster').collection('users').insertOne({ name: 'teste', email: 'teste@teste.com', password: 'teste4321' });
      response = await chai.request(app).post('/users').send({ name: 'teste', email: 'teste@teste.com', password: 'teste1234' });
    });

    after(() => {
      MongoClient.connect.restore();
    });
    
    it('retorna status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com a propriedade message com uma string', () => {
      expect(response.body).to.have.a.property('message').which.is.a('string');
    });

    it('retorna uma mensagem de erro', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });

  });
});

describe('POST /users/admin', () => {
  describe('quando não está autenticado', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/users/admin').send({});
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com a propriedade message com uma string', () => {
      expect(response.body).to.have.a.property('message').which.is.a('string');
    });

    it('retorna uma mensagem de erro', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });

  })

  describe.only('quando está autenticado como admin', () => {
    let response;
    let connectionMock;

    const mockUser = { name: "create-teste", email: 'created-teste@teste.com', password: 'created-teste4321' }
    const { password, ...mockUserWithoutPassword } = mockUser;

    before(async () => {
      connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await connectionMock.db('Cookmaster').collection('users').insertOne({ name: 'teste', email: 'teste@teste.com', password: 'teste4321', role: 'admin' });
      const verified = await chai.request(app).post('/login').send({ email: 'teste@teste.com', password: 'teste4321' });
      response = await chai.request(app).post('/users/admin').set("authorization", verified.body.token).send(mockUser);
    });

    after(() => {
      MongoClient.connect.restore();
    });
    
    it('retorna status 201', () => {
      console.log('AAAaquiiiii ', response);
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com a propriedade _id com uma string', () => {
      expect(response.body.user).to.have.a.property('_id').which.is.a('string');
    });

    it('retorna no objeto o objeto do usuario criado sem password', () => {
      expect(response.body.user).to.include(mockUserWithoutPassword);
    });

  });
});