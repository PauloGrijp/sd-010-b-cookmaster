const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {expect} = chai
const { MongoClient } = require('mongodb');
const { getConnection, DBServer } = require('./connectionMock');
const server = require('../api/app');


describe('POST /recipes', () => {
  
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();    
  });

  /* CRIA RECEITA SEM TOKEN */
  describe('Quando cria a receita sem token', () => {

    let response = {}
    
    before (async () => {
      response = await chai.request(server).post('/recipes')
      .set({'authorization': ''})
      .send({
        name: 'banana',
        ingredients: 'banana',
        preparation: 'banana'
      });
    });

    it('Deve retornar status 401', () => {
      expect(response).to.have.status(401);
    });

    it('o objeto retorna uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('a propriedade "message" retorna "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });

  /* TOKEN INVÁLIDO */  
  describe('Quando o token enviado é inválido', () => {

    let response = {}

    before(async () => {
      response = await chai.request(server).post('/recipes')
      .set('authorization', 'tokenInvalido')
      .send({
        name: 'banana',
        ingredients: 'banana',
        preparation: 'banana'
      });
    });

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto retorna uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" retorna "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });
  
  describe('Quando os campos nome, ingredientes e preparo não são passados', () => {
    let response;

    before(async () => {
      
      const userCollection = await connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        email: 'rafael@trybe.com',
        password: 'password'
      })

      const {body: {token}} = await chai.request(server).post('/login').send({
        email: 'rafael@trybe.com',
        password: 'password'
      })    
      
      response = await chai.request(server).post('/recipes')
      .set({'authorization': token})
      .send({
        name: 'banana',
        ingredients: 'banana',
        preparation: 'banana'
      });      
    });

  });

  describe('Quando a receita é criada com sucesso', () => {
    let response;

    before(async () => {
      
      const userCollection = await connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        email: 'rafael@trybe.com',
        password: 'password'
      })

      const {body: {token}} = await chai.request(server).post('/login').send({
        email: 'rafael@trybe.com',
        password: 'password'
      })    
      
      response = await chai.request(server).post('/recipes')
      .set({'authorization': token})
      .send({
        name: 'banana',
        ingredients: 'banana',
        preparation: 'banana'
      });      
    });

    it('retorna código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('objeto de resposta possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });    

    it('a propriedade "message" tem os campos "id, name, ingredientes, preparation, userId"', () => {
      expect(response.body.recipe).to.includes.keys('_id', 'name', 'ingredients', 'preparation', 'userId');
    });
  });
});