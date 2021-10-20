const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', function () {
   describe('quando é criado com sucesso', function () {
       let response = {};
        const DBServer = new MongoMemoryServer();

       before(async function () {
            const URLMock = await DBServer.getUri();
            const connectionMock = await MongoClient.connect(URLMock,
                { useNewUrlParser: true, useUnifiedTopology: true });

            sinon.stub(MongoClient, 'connect')
                .resolves(connectionMock);

           response = await chai.request(server)
               .post('/users')
               .send({
                   name: 'jane',
                   password: 'senha123',
                   email: 'oi@oi.com',
               });
       });
       
        after(async function () {
            MongoClient.connect.restore();
            await DBServer.stop();
        });

       it('retorna o código de status 201', function () {
           expect(response).to.have.status(201);
       });

       it('retorna um objeto', function () {
           expect(response.body).to.be.a('object');
       });

       it('o objeto possui a propriedade "user"', function () {
           expect(response.body).to.have.property('user');
       });
       
      it('o objeto "user" possui a propriedade "name"', function () {
          expect(response.body.user).to.have.property('name');
      });

      it('o objeto "user" possui a propriedade "email"', function () {
          expect(response.body.user).to.have.property('email');
      });
   });
});