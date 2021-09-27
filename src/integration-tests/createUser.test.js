const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { MongoClient }  = require('mongodb');
const getConnection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);


describe('POST/users', () => {
  let connectionMock;

  beforeEach( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(() => {
    MongoClient.connect.restore();
  });

  describe('Testa a criação com sucesso de um novo usuário', () => {
    let response;
    before( async () => {
      response = await chai.request(server).post('/users').send({
        name: "Erick Jacquin",
        email: "erickJaquin@gmail.com",
        password: "12345678",
      });
    });
    it('testa se resposta vem com o status correto', () => {
      expect(response).to.have.status(201);
    });
    
    it('testa se resposta vem como um objeto', () => {
        expect(response.body).to.be.an('object');
      });

    it('testa se resposta contem as propriedades desejadas', () => {
      expect(response.body).to.have.property('user')
      expect(response.body.user).to.have.property('name');
      expect(response.body.user).to.have.property('email');
      expect(response.body.user).to.have.property('role');
    });

    it('testa se a resposta cotém o resultado desejado', () => {
      expect(response.body.user).to.be.deep.equal({
        _id: response.body.user._id,
        name: "Erick Jacquin",
        email: "erickJaquin@gmail.com",
        role: 'user',
      });
    });
  });
  describe('Testa caso a requisicao do usuario esteja com algum campo omisso', () => {
    let response;
    before( async () => {
      response = await chai.request(server).post('/users').send({
        email: "erickjaquino@gmail.com",
        password: "12345678",
      });
    });
    it('testa se resposta vem com status correto', () => {
      expect(response).to.have.status(400);
    });

    it('testa se resposta vem como um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('testa se resposta contem as propriedades desejadas', () => {
      expect(response.body).to.have.property('message');
    });

    it('testa se a resposta cotém o resultado desejado', () => {
      expect(response.body.message).to.be.deep.equal('Invalid entries. Try again.');
    });
  });
  describe('Testa caso a requisicao do usuario seja feita com um email já existente', () => {
    let response;

    before( async () => {
      await connectionMock.db('Cookmaster').collection('users').insertOne({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "12345678",
        role: "user",
      });
      response = await chai.request(server).post('/users').send({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "12345678",
      });
    });

    it('testa se resposta vem com o status correto', () => 
      expect(response).to.have.status(409)
    );

    it('testa se resposta vem como um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('testa se resposta contem as propriedades desejadas', () => {
      expect(response.body).to.have.property('message')
    });

    it('testa se a resposta cotém o resultado desejado', () => {
      expect(response.body.message).to.be.deep.equal('Email already registered');
    });
  });
});
