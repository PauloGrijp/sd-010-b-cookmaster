const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server'); 
const server = require('../api/server');
chai.use(chaiHttp);
const {expect} = chai

describe('POST /users', () => {
  describe('Quando não é passada email, nome e senha', () => {
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
              .send({});
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
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
                name: 'felippe',
                email: 'felippe@test.com',
                password: 'password-ok'
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
      it('o objeto possui a propriedade "user"', () => {
          expect(response.body).to.have.property('user');
      });
      it('a propriedade "user" possui um objeto com as propriedas "name", "email", "role", "_id"',
          () => {
            expect(response.body.user).to.have.property("name");
            expect(response.body.user).to.have.property("email");
            expect(response.body.user).to.have.property("role");
            expect(response.body.user).to.have.property("_id");
          }
      );
  });

  describe('verifica se a propriedade "role" recebe o valor "admin" na rota "users/admin"', () => {
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
              name: 'felippe',
              email: 'felippe@test.com',
              role: 'admin',
              password: 'password-ok',
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
    it('o objeto possui a propriedade "user"', () => {
        expect(response.body).to.have.property('user');
    });
    it('a propriedade "user" possui um objeto com as propriedade "role" que possui o valor "admin"',
        () => {
          expect(response.body.user.role).to.be.equal("admin");
        }
    );
  });
});
