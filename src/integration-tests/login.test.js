const chai = require('chai');

const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

const server = require('../api/app');

describe('POST /login', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não é passado usuário e senha', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server).post('/login').send({});
    });

    after(async () => {});

    it('retorna status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade message', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('Quando usuário ou senha estão incorretos', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server).post('/login').send({
        email: 'erickjacquin@',
        password: '12345678',
      });
    });

    after(async () => {});

    it('retorna status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade message', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals(
        'Incorrect username or password'
      );
    });
  });

   describe('Quando o login é realizado com sucesso', () => {
    let response = {};

    before(async () => {

      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
          name: 'teste',
          email: 'teste@gmail.com',
          password: 'teste12345'
      })

      response = await chai.request(server).post('/login')
          .send({
            email: 'teste@gmail.com',
            password: 'teste12345'
          });
  });

    after(async () => {});

    it('retorna status "200"', () => {
      expect(response).to.have.status(200);
    });
  });
});
