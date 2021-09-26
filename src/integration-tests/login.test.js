const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { getConnection } = require('./connectionMock');
const server = require('../api/server');
chai.use(chaiHttp);
const {expect} = chai;

describe('POST /login', () => {

  let connectionMock;
  before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

/*   after(async () => {
      MongoClient.connect.restore();
  }); */

  describe('Quando não é passada email e senha', () => {
    let response;
    before(async () => {
        response = await chai.request(server).post('/login').send({})
    });

    it('retorna código de status 401', () => {
        expect(response).to.have.status(401);
    });

    it('retorna um object no body', () => {
        expect(response.body).to.be.an('object')
    })

    it('objeto de resposta possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "All fields must be filled"', () => {
        expect(response.body.message).to.be.equals('All fields must be filled');
    });

  });

  describe('Quando email ou senha são inválidos', () => {
    let response;

    before(async () => {
        response = await chai.request(server).post('/login').send({
            email: 'user-fake',
            password: 'senha-fake'
        })
    })

    it('retorna código de status "401"', () => {
        expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor de "Incorret username or password"', () => {
        expect(response.body.message).to.be.equals('Incorret username or password');
    });
  }); 

  describe('Login de usuários é feito com sucesso', () => {
      let response = {};
      before(async () => {
        const userCollection = connectionMock.db('Cookmaster').collection('users')
          await userCollection.insertOne({
            email: 'felippe@test.com',
            password: 'password-ok'
        });

        response = await chai.request(server).post('/login')
          .send({
              email: 'felippe@test.com',
              password: 'password-ok'
          });
      });

     /*  after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      }); */

      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });
      it('retorna um objeto', () => {
          expect(response.body).to.be.a('object');
      });
      it('o objeto possui a propriedade "token"', () => {
          expect(response.body).to.have.property('token');
      });
      it('a propriedade "token" não está vazia', () => {
        expect(response.body.token).to.be.not.empty;
      });
  });
});
