const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
/* const { MongoMemoryServer } = require('mongodb-memory-server'); */
const { getConnection } = require('./connectionMock');
const server = require('../api/server');
chai.use(chaiHttp);
const {expect} = chai

describe('POST /users', () => {
  let connectionMock;
  before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  describe('Quando não é passada email, nome e senha', () => {
    let response;
    before(async () => {
        response = await chai.request(server).post('/users').send({})
    });

    it('retorna código de status 400', () => {
        expect(response).to.have.status(400);
    });

    it('retorna um object no body', () => {
        expect(response.body).to.be.an('object')
    })

    it('objeto de resposta possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });

  });

  describe('cadastro de usuários é feito com sucesso', () => {
    let response = {};

    before(async () => {
      /* const userCollection = connectionMock.db('Cookmaster').collection('users')
        await userCollection.insertOne({
          name: 'felippe',
          email: 'felippe@test.com',
          password: 'password-ok'
        }); */

      response = await chai.request(server).post('/users')
        .send({
          name: 'felippe',
          email: 'felippe@test.com',
          password: 'password-ok'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      /* await DBServer.stop(); */
      /* await userCollection.deleteMany({}); */
    });

      it('retorna o código de status 201', () => {
        expect(response).to.have.status(201);
      });
      it('retorna um objeto', () => {
          expect(response.body).to.be.a('object');
      });
      it('o objeto possui a propriedade "user"', () => {
          expect(response.body).to.have.property('user');
      });
      // it('a propriedade "message" possui o texto "Novo usuário criado com sucesso"',
      //     () => {
      //         expect(response.body.message)
      //             .to.be.equal('Novo usuário criado com sucesso');
      //     }
      // );
  });
});
