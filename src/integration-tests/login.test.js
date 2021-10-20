const chai = require('chai');
const sinon = require('sinon');
const getConnection = require('./connectionMock');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { expect } = chai;

let connectionMock;

chai.use(chaiHttp);

describe('POST /api/login', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(async () => {
    MongoClient.connect.restore();
  });

  describe('quando o login é feito com sucesso', () => {
    const request = {
      email: 'teste@teste.com',
      password: 'teste'
    };
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send(request);
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    it('o objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('quando a senha não é enviada na requisição', () => {
    const request = {
      email: 'teste@teste.com',
      password: ''
    };
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send(request);
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('a propriedade "message" possui o texto ""password" is not allowed to be empty"', () => {
      expect(response.body.message).to.be.equal('"password" is not allowed to be empty');
    });
  });

  describe('quando a senha é incorreta', async () => {
    const request = {
      email: 'teste@teste.com',
      password: 'senhaerrada'
    };
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send(request);
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('a propriedade "message" possui o texto "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
});
