const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const DB_NAME = 'Cookmaster';
const USERS_COLLECTION = 'users';

const { MongoClient } = require('mongodb');
const { dbConnect, dbDisconnect } = require('./connectionMock');
const { code, error } = require('../schema');
const app = require('../api/app');

describe('POST /users', () => {
  let connectionMock;
  
  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(async () => await dbDisconnect());

  describe('quando não é passado um dos campos obrigatórios', () => {
    let response;

    before(async () => {
      await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});

      response = await chai.request(app)
      .post('/users')
      .send({
        email: 'brunobatista@gmail.com',
        password: '123456789'
      });
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});
    });

    it('retornar o código status 400', () => {
      expect(response).to.have.status(code.HTTP_BAD_REQUEST);
    });

    it('retornar um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possuí a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" retornar a menssagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal(error.invalidEntries);
    });
  });
  
  describe('quando cadastrado com sucesso', () => {
    let response;

    before(async () => {
      await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});

      response = await chai.request(app)
      .post('/users')
      .send({
        name: 'Batista',
        email: 'brunobatista@gmail.com',
        password: '123456789'
      });
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});
    });

    it('retorna o código status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" não deve estar vazia', () => {
      expect(response.body.user).to.be.not.empty;
    });
  });
});
