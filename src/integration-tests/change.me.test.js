const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');


const server = require('../api/server');

chai.use(chaiHttp);
const {expect} = chai


describe('POST /users', () => {
  describe('cadastro de usuários ', () => {
      let response = {};

      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
            const connectionMock = await MongoClient.connect(URLMock,
                { useNewUrlParser: true, useUnifiedTopology: true }
            );

            sinon.stub(MongoClient, 'connect')
                .resolves(connectionMock);

          response = await chai.request(server)
              .post('/users')
              .send({
                name: 'Rafael',
                email: 'rafael@test.com',
                password: '123456'
              });
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

      it('retorna o código de status 201', () => {
        expect(response).to.have.status(201);
      });

      it('retorna um objeto', () => {
          expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
          expect(response.body).to.have.property('message');
      });

      // it('a propriedade "message" possui o texto "Novo usuário criado com sucesso"',
      //     () => {
      //         expect(response.body.message)
      //             .to.be.equal('Novo usuário criado com sucesso');
      //     }
      // );
  });
});