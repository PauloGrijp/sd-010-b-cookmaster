const chai = require('chai');

const { MongoClient } = require('mongodb');
const sinon = require('sinon');

const { getConnection } = require('./connectionMock');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const server = require('../api/app');

describe('POST /users', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock)
  })

  after(async () => {
    MongoClient.connect.restore();
  })

  describe('Quando usuário ou senha estão incorretos', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server).post('/users').send({});
    });

    after(async () => {
    });

    it('retorna status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade message', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Quando o usuário é registrado', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server).post('/users').send({
        name: 'Batista',
        email: 'brunobatista@gmail.com',
        password: '12345678',
      });
    });

    after(async () => {
    });

    it('retorna status "201"', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade user', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" tem o valores "name, email, role, _id"', () => {
      expect(response.body.user).to.have.property('name');
      expect(response.body.user).to.have.property('email');
      expect(response.body.user).to.have.property('role');
      expect(response.body.user).to.have.property('_id');
    });
  });
});
