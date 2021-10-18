const chai = require('chai');

const { MongoClient } = require('mongodb');
const sinon = require('sinon');

const { getConnection } = require('./connectionMock');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const server = require('../api/app');

describe('post /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('post sem auth token', () => {
    let response = {};

    before(async () => {
      const userCollection = connectionMock
        .db('Cookmaster')
        .collection('recipes');

      response = await chai.request(server).post('/recipes').send({
        name: 'Galinha',
        ingredients: 'Galinha, sazon',
        preparation: '30 minutos no forno',
      });
    });

    after(async () => {});

    it('retorna status "401"', () => {
      expect(response).to.have.status(401);
    });
  });
});

describe('GET /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('GET com sucesso', () => {
    let response = {};

    before(async () => {
      const userCollection = connectionMock
        .db('Cookmaster')
        .collection('recipes');
      await userCollection.insertOne({
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
      });

      response = await chai.request(server).get('/recipes').send({});
    });

    after(async () => {});

    it('retorna status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.an('array');
    });
  });
});

describe('GET /recipes/id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('GET com sucesso', () => {
    let response = {};

    before(async () => {
      await chai.request(server).post('/users').send({
        name: 'teste',
        email: 'teste@gmail.com.br',
        password: '12345',
      });

      response = await chai.request(server).post('/login').send({
        email: 'teste@gmail.com.br',
        password: '12345',
      });

      response = await chai
        .request(server)
        .post('/recipes')
        .set('authorization', response.body.token)
        .send({
          name: 'Bolo',
          ingredients: 'Fermento, farinha, ovos',
          preparation: '40 minutos no forno',
        });

      response = await chai
        .request(server)
        .get(`/recipes/${response.body.recipe._id}`);
    });

    after(async () => {});

    it('retorna status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
  });
});

describe('delete /recipes/id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('deletar sem auth token', () => {
    let response = {};

    before(async () => {
      const userCollection = connectionMock
        .db('Cookmaster')
        .collection('recipes');
      await userCollection.insertOne({
        _id: '123456789',
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
      });

      response = await chai
        .request(server)
        .delete('/recipes/123456789')
        .send({});
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
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });
});
