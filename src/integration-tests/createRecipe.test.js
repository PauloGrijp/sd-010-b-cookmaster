const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { MongoClient }  = require('mongodb');
const getConnection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);


describe('POST/recipes', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });
  describe('Testa a criacao com sucesso de uma nova receita', () => {
    let response;
    let userId;
    let recipeId;
    before(async () => {
      const { body: { user } } = await chai.request(server).post('/users').send({
        name: "Erick Jacquin",
        email: "erickjaquinO@gmail.com",
        password: "12345678",
      });
      userId = user._id
      const { body: { token } } = await chai.request(server).post('/login').send({
        email: "erickjaquinO@gmail.com",
        password: "12345678",
      });
      response = await chai.request(server).post('/recipes').set({ authorization: token })
      .send({
        name: 'Frango',
        preparation: '10 minutos no forno',
        ingredients: 'Frango, sazon',
      });
      const { body: { recipe } } = response;
      recipeId = recipe._id;
    });
    it('testa se resposta vem com o status correto', () => {
      expect(response).to.have.status(201);
    });

    it('testa se resposta vem como um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('testa se resposta contem as propriedades desejadas', () => {
      expect(response.body).to.have.property('recipe')
      expect(response.body.recipe).to.have.property('name');
      expect(response.body.recipe).to.have.property('preparation');
      expect(response.body.recipe).to.have.property('ingredients');
      expect(response.body.recipe).to.have.property('userId');
      expect(response.body.recipe).to.have.property('_id');
    });

    it('testa se a resposta cotém o resultado desejado', () => {
      expect(response.body.recipe).to.be.deep.equal({
        _id: recipeId,
        name: "Frango",
        preparation: "10 minutos no forno",
        ingredients: "Frango, sazon",
        userId,
      });
    });
  });
  describe('Testa caso a requisicao do usuario esteja com algum campo omisso', () => {
    let response;
    before(async () => {
      const { insertedId } = await chai.request(server).post('/users').send({
        name: "Erick Jacquin",
        email: "erickjaquinO@gmail.com",
        password: "12345678",
      });
      userId = insertedId;
      const { body: { token } } = await chai.request(server).post('/login').send({
        email: "erickjaquinO@gmail.com",
        password: "12345678",
      });
      response = await chai.request(server).post('/recipes').set({ authorization: token })
      .send({
        preparation: '10 minutos no forno',
        ingredients: 'Frango, sazon',
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
  describe('Testa caso o token nao seja fornecido', () => {
    let response;
    before( async () => {
      response = await chai.request(server).post('/recipes')
      .send({
        name: 'Frango',
        preparation: '10 minutos no forno',
        ingredients: 'Frango, sazon',
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
    it('testa se resposta contem a mensagem desejada', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });
  describe('Testa caso o token seja incorreto', () => {
    let response;
    before( async () => {
      response = await chai.request(server).post('/recipes').set({ authorization: 'qfwq' })
      .send({
        name: 'Frango',
        preparation: '10 minutos no forno',
        ingredients: 'Frango, sazon',
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
    it('testa se resposta contem a mensagem desejada', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });
});