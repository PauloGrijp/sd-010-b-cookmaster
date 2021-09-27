const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { MongoClient }  = require('mongodb');
const getConnection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);

describe('POST/login', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });
  describe('Testa quando usuario e logado com sucesso', () => {
    before(async () => {
      await connectionMock.db('Cookmaster').collection('users').insertOne({
        name: "Erick Jacquin",
        email: "erickjaquinO@gmail.com",
        password: "12345678",
        role: "user",
      });
      response = await chai.request(server).post('/login').send({
        email: "erickjaquinO@gmail.com",
        password: "12345678",
      });
    })
    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
    });
    it('testa se resposta vem com o status correto', () => {
      expect(response).to.have.status(200);
    });

    it('testa se resposta vem como um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('testa se resposta contem as propriedades desejadas', () => {
      expect(response.body).to.have.property('token');
    });

    it('testa se a resposta cotém o resultado desejado', () => {
      expect(response.body.token).to.be.a('string');
    });
  });
  describe('Testa caso a requisicao do usuario esteja com algum campo omisso', () => {
    let response;
    before( async () => {
      response = await chai.request(server).post('/login').send({
        password: "12345678",
      });
    });
    it('testa se resposta vem com status correto', () => {
      expect(response).to.have.status(401);
    });

    it('testa se resposta vem como um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('testa se resposta contem as propriedades desejadas', () => {
      expect(response.body).to.have.property('message');
    });

    it('testa se a resposta cotém o resultado desejado', () => {
      expect(response.body.message).to.be.deep.equal('All fields must be filled');
    });
  });
  describe('Testa caso o usuario nao exista', () => {
    let response;
    before( async () => {
      response = await chai.request(server).post('/login').send({
        email: "erickjaquin@gmail.com",
        password: "12345678",
      });
    });
    it('testa se resposta vem com status correto', () => {
      expect(response).to.have.status(401);
    });

    it('testa se resposta vem como um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('testa se resposta contem as propriedades desejadas', () => {
      expect(response.body).to.have.property('message');
    });

    it('testa se a resposta cotém o resultado desejado', () => {
      expect(response.body.message).to.be.deep.equal('Incorrect username or password');
    });
  });
});