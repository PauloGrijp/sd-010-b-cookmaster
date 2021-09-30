const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/app');
chai.use(chaiHttp);
const {expect} = chai

describe('POST /recipes', () => {
  describe('Quando não é passada nome, ingredients e preparation', () => {
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
            .post('/recipes')
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

  describe('cadastro de receitas feito com sucesso', () => {
    let response = {};
    let token;
    const DBServer = new MongoMemoryServer();
    
    before(async () => {
      const URLMock = await DBServer.getUri();
          const connectionMock = await MongoClient.connect(URLMock,
            { useNewUrlParser: true, useUnifiedTopology: true }
          );
    
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
     /*  const password = "password-ok";    
        const { body: { user: { email } } }= await chai.request(server).post('/users').send({
          name: "felippe",
          email: "felippe@test.com",
          password
        })  */
      
       /*  const { token } = chai.request(server).post('/login').send({
          email,
          password
        })
        .end((_error, response) => {
          console.log(response.body);
          token = response.body.token;
          done();
        })     */
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxNTVmYWNmOTI1N2Y0N2UxNTkyZTk0YSIsIm5hbWUiOiJmZWxpcHBlIiwiZW1haWwiOiJmZWxpcHBlQHRlc3QuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZC1vayIsInJvbGUiOm51bGx9LCJpYXQiOjE2MzMwMzM2MjcsImV4cCI6MTYzMzYzODQyN30.ooMm0g6eAgNIfo4bF1woepjZQ3u6yzKU-QU50I6sPSw'
      console.log(token, 'token aqui');
        response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: "nugettuva",
          ingredients: "nugetts e uva",
          preparation: "10 minutos"
        })
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
      it('o objeto possui a propriedade "recipe"', () => {
          expect(response.body).to.have.property('recipe');
      });
      it('a propriedade "recipe" possui um objeto com as propriedades "name", "ingredients", "preparation", "userId", "_id"',
          () => {
            expect(response.body.recipe).to.have.property("name");
            expect(response.body.recipe).to.have.property("ingredients");
            expect(response.body.recipe).to.have.property("preparation");
            expect(response.body.recipe).to.have.property("userId");
            expect(response.body.recipe).to.have.property("_id");
          }
      );
  });
});

describe('GET /recipes', () => {
  describe('verifica se as receitas são listadas com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();
    
    before(async () => {
      const URLMock = await DBServer.getUri();
          const connectionMock = await MongoClient.connect(URLMock,
            { useNewUrlParser: true, useUnifiedTopology: true }
          );
      sinon.stub(MongoClient, 'connect').resolves(connectionMock)
        response = await chai.request(server).get('/recipes')
    });
    
    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    it('retorna um objeto', () => {
        expect(response.body).to.be.a('array');
    });
    it('retorna um array com objetos',
        () => {
          const [objects] = response.body;
          expect(objects).to.have.property("name");
          expect(objects).to.have.property("ingredients");
          expect(objects).to.have.property("preparation");
          expect(objects).to.have.property("userId");
          expect(objects).to.have.property("_id");
        }
      );
  });
});