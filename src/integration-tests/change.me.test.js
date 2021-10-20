const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai

describe('Testando a rota /users', () => {
  describe('Quando usuário é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
            name: 'Ricardo Augusto',
            email: 'trybe@betrybe.com',
            password: 'senha123'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Retorna o código de status 201 e o objeto usuário', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto', () => {
        expect(response).to.be.an('object');
    });

    it('O Objeto contém chave "user"', () => {
        expect(response.body).to.have.property('user');
    });

    it('O Objeto contem as keys "name", "email", "role"', () => {
        expect(response.body.user).to.have.all.keys('name', 'email', 'role');
    });
    
    it('O objeto não está vazio', () => {
        expect(response.body).to.be.not.empty;
    })

    
  });
});

describe('Testando a rota /login', () => {
    describe('Usuário logado com sucesso', () => {
        let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
            name: 'Ricardo Augusto',
            email: 'trybe@betrybe.com',
            password: 'senha123'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Permite efetuar login com o usuário criado anteriormente', async () => {
        response = await chai.request(server)
        .post('/login')
        .send({
            email: 'trybe@betrybe.com',
            password: 'senha123'
        });
  
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('token');
      });
  
      it('Não permite realizar o login com a senha errada', async () => {
        response = await chai.request(server)
        .post('/login')
        .send({
            email: 'trybe@betrybe.com',
            password: 'senha123'
        });
  
        expect(response).to.have.status(401);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
      });
  
      it('"message" possui o valor "Incorrect username or password"', () => {
          expect(response.body.message).to.be.equal('Incorrect username or password');
      });
  
      it('Não permite realizar o login com o email errado', async () => {
        response = await chai.request(server)
        .post('/login')
        .send({
            email: 'whind@tests.com',
            password: 'senha123'
        });
  
        expect(response).to.have.status(401);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
      });
  
      it('"message" possui o valor "Incorrect username or password"', () => {
          expect(response.body.message).to.be.equal('Incorrect username or password');
      });
    })
})