const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {expect} = chai
const { MongoClient } = require('mongodb');
const { getConnection, DBServer } = require('./connectionMock');
const server = require('../api/app');


describe('POST /users', () => {
  
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(async () => {
    MongoClient.connect.restore();
  });
  
  /* CADASTRO DE USUÁRIO COM SUCESSO */
  describe('cadastro de usuários com sucesso ', () => {
    let response = {};
    
    before(async () => {
      response = await chai.request(server).post('/users').send({
        name: 'Rafael',
        email: 'rafael@trybe.com',
        password: '123456'
      });
    });

    
    it('retorna o código de status "201"', () => {
      expect(response).to.have.status(201);
    });

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
  });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    // it('a resposta possui a propriedade "id, name, email, role"', () => {
    //   expect(response.body.user).to.have.property("name");
    //   expect(response.body.user).to.have.property("email");
    //   expect(response.body.user).to.have.property("role");
    //   expect(response.body.user).to.have.property("_id");
    // });     
  });


  /* EMAIL JÁ EXISTE NO BANCO */
  describe('o email já existe no banco de dados', () => {
    let response = {}

    before(async () => {
      
      const userCollection = connectionMock.db('Cookmaster').collection('user')
      await userCollection.insertOne({
        name: 'Rafael',
        email: 'rafael@trybe.com',
        password: '123456'
      })

      response = await chai.request(server).post('/users')
        .send({
          name: 'Rafael',
          email: 'rafael@trybe.com',
          password: '123456'
        });
     });
  
    it('retorna o código "409"', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto retorna uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" retorna "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });

  /* TESTE PARA CAMPOS INVÁLIDOS */
  describe('Quando não é passado os campos "nome", "email", "senha"', () => {
    let response = {}

    before(async () => {      

      response = await chai.request(server).post('/users')
        .send({
          name: '',
          email: '',
          password: ''
        });
     });

     it('retorna o código "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto retorna uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" retorna "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });    
  });
});

describe('POST /users/admin', () => {});