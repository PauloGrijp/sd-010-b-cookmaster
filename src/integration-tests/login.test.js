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

  after(async () => {
      MongoClient.connect.restore();
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
       /*  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
           const validLogin = {
              name: "felippe",
              email: "felippe@test.com",
              password: "247105887",
            };      
          await connectionMock.collection("users").insertOne(validLogin);
          response = await chai.request(server)
              .post('/login')
              .send({
                email: 'felippe@test.com',
                password: '247105887'
          }); */
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });
      it('retorna um objeto', () => {
          expect(response.body).to.be.a('object');
      });
      it('o objeto possui a propriedade "token"', () => {
          expect(response.body).to.have.property('token');
      });
      // it('a propriedade "message" possui o texto "Novo usuário criado com sucesso"',
      //     () => {
      //         expect(response.body.message)
      //             .to.be.equal('Novo usuário criado com sucesso');
      //     }
      // );
  });
});
