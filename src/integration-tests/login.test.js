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

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => await dbDisconnect());

  describe('Quando não é passada o email e password', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('retornar código de status 401', () => {
      expect(response).to.have.status(code.HTTP_UNAUTHORIZED);
    });

    it('retornar um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possuí a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possuí a mensagem "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals(error.unfilledFields);
    });
  });

  describe('Quando a pessoa usuária não existe ou o password é inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        email: 'fake@trybe.com',
        password: 'fake'
      });
    });

    it('retornar código de status 401', () => {
      expect(response).to.have.status(code.HTTP_UNAUTHORIZED);
    });

    it('retornar um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possuí a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possuí a mensagem "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals(error.incorrectField);
    });
  });

  describe('Quando o login é feito com sucesso', () => {
    let response;

    before(async () => {
      const userColletion = connectionMock.db(DB_NAME).collection(USERS_COLLECTION);

      await userColletion.insertOne({
        name: 'Batista',
        email: 'brunobatista@gmail.com',
        password: '123456789'
      });

      response = await chai.request(app).post('/login')
        .send({
          email: 'brunobatista@gmail.com',
          password: '123456789'
        });
    });

    it('retorna o código status 200' , () => {
      expect(response).to.have.status(code.HTTP_OK_STATUS);
    });
    
    it('retornar um objeto no body' , () => {
      expect(response.body).to.be.an('object');
    });
  
    it('o objeto possui a propriedade "token"' , () => {
      expect(response.body).to.have.property('token');
    });

    it('a propriedade "token" não pode ser vazio' , () => {
      expect(response.body.token).to.be.not.empty;
    });
  });
});
