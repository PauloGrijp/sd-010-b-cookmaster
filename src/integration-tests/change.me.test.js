const chai = require('chai');

const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const server = require('../api/app');

describe('POST /login', () => {
  describe('Quando não é passado usuário e senha', () => {
    let response = {};

    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/login').send({});
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
    });

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

    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/login').send({
        email: "erickjacquin@",
        password: "12345678",
      });
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
    });

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
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });
});

describe('POST /users', () => {
  describe('Quando usuário ou senha estão incorretos', () => {
    let response = {};

    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send({});
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
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

  describe('Quando todos os dados estão corretos', () => {
    let response = {};

    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send({
        name: "Batista",
        email: "brunobatista@gmail.com",
        password: "12345678"
      });
    });

    after(async () => {
      MongoClient.connect.restore();
      // await DBServer.stop();
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
