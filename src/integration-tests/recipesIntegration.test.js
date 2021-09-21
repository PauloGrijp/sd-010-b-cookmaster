const chai = require('chai');
const chaiHttp = require('chai-http');
const MongoClient = require('mongodb/lib/mongo_client');
const sinon = require('sinon');
const { getConnection } = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /recipes', () => {
  let connection;

  before( async () => {
    connection = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connection);
  });

  after(() => MongoClient.connect.restore());

  // usuário não logado
  describe('quando o usuário não está logado', () => {
    let response;

    before(async () => {
        response = await chai.request(server).post('/recipes').send({
          name: 'Recipe Name',
          ingredients: 'Recipe ingredients',
          preparation: 'Recipe preparation',
        })
    });
    
    it('retorna o código 401', () => {
      expect(response).to.have.status(401);
    });

    it(' retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto contém a propriedade "message" com: "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    })
  });

  // sem o campo "name"
  describe('quando não é enviado o campo "name', () => {
    let response;

    before(async () => {
      await chai.request(server).post('/users').send({
        name: 'John',
        email: 'john@testingmail.com',
        password: 'myPassword',
      });

      const login = await chai.request(server).post('/login').send({
        email: 'john@testingmail.com',
        password: 'myPassword',
      });

      response = await chai.request(server).post('/recipes').set(
        'Authorization', login.body.token
      ).send({
        // name: 'Recipe Name',
        ingredients: 'Recipe ingredients',
        preparation: 'Recipe preparation',
      })
    });
    
    it('retorna o código 400', () => {
      expect(response).to.have.status(400);
    });

    it(' retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto contém a propriedade "message" com: "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
  // sem o campo "ingredients"
  describe('quando não é enviado o campo "ingredients', () => {
    let response;

    before(async () => {
      await chai.request(server).post('/users').send({
        name: 'John',
        email: 'john@testingmail.com',
        password: 'myPassword',
      });

      const login = await chai.request(server).post('/login').send({
        email: 'john@testingmail.com',
        password: 'myPassword',
      });

      response = await chai.request(server).post('/recipes').set(
        'Authorization', login.body.token
      ).send({
        name: 'Recipe Name',
        // ingredients: 'Recipe ingredients',
        preparation: 'Recipe preparation',
      })
    });
    
    it('retorna o código 400', () => {
      expect(response).to.have.status(400);
    });

    it(' retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto contém a propriedade "message" com: "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  // sem o campo "preparation"
  describe('quando não é enviado o campo "preparation"', () => {
    let response;

    before(async () => {
      await chai.request(server).post('/users').send({
        name: 'John',
        email: 'john@testingmail.com',
        password: 'myPassword',
      });

      const login = await chai.request(server).post('/login').send({
        email: 'john@testingmail.com',
        password: 'myPassword',
      });

      response = await chai.request(server).post('/recipes').set(
        'Authorization', login.body.token
      ).send({
        name: 'Recipe Name',
        ingredients: 'Recipe ingredients',
        // preparation: 'Recipe preparation',
      })
    });
    
    it('retorna o código 400', () => {
      expect(response).to.have.status(400);
    });

    it(' retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto contém a propriedade "message" com: "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  // com um token inválido
  describe('quando não é enviado o campo "name', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/recipes').set(
        'Authorization', '4213689fas5r4bkjasfd67981'
      ).send({
        name: 'Recipe Name',
        ingredients: 'Recipe ingredients',
        preparation: 'Recipe preparation',
      })
    });
    
    it('retorna o código 401', () => {
      expect(response).to.have.status(401);
    });

    it(' retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto contém a propriedade "message" com: "jwt malformed"', () => {
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });

  //logado, com token válido e um payload válido
  describe('quando não é enviado o campo "name', () => {
    let response;

    before(async () => {
      await chai.request(server).post('/users').send({
        name: 'John',
        email: 'john@testingmail.com',
        password: 'myPassword',
      });

      const login = await chai.request(server).post('/login').send({
        email: 'john@testingmail.com',
        password: 'myPassword',
      });

      response = await chai.request(server).post('/recipes').set(
        'Authorization', login.body.token
      ).send({
        name: 'Recipe Name',
        ingredients: 'Recipe ingredients',
        preparation: 'Recipe preparation',
      })
    });
    
    it('retorna o código 201', () => {
      expect(response).to.have.status(201);
    });

    it(' retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto contém a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('a propriedade recipe contém um objeto com as propriedades: "name", "ingredients", "preparation", "userId" e "_id"', () => {
      expect(response.body.recipe).to.have.keys("name", "ingredients", "preparation", "userId", "_id");
    })
  });
});