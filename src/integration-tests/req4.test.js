const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const server = require('../api/app');

const { getConnection } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa endpoint para cadastro de receitas', function () {
  describe('quando é cadastrado com sucesso', function () {
    describe('a resposta', function () {
      const user = {
        name: 'Jake the Dog',
        email: 'jake@dog.com',
        password: 'adventureTime',
      };

      const { name: _, ...userLogInfo } = user;

      const newRecipe = {
        name: 'Panquecas de toucinho',
        ingredients: 'Poẽ o bacon na panqueca direitinho',
        preparation: 'eu vou fazeeeeeeeer',
      };

      let login;
      let response;
      let mockConnection;

      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        login = await chai.request(server).post('/login').send(userLogInfo);
        const { token } = login.body;
        response = await chai
          .request(server).post('/recipes').send(newRecipe).set({ authorization: token });
      });

      after(async function () {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 201', function () {
       expect(response).to.have.status(201);
      });

      it('retorna um objeto', function () {
        expect(response).to.be.an('object');       
      });

      it('contém a chave "recipe"', function () {
       expect(response.body).to.have.property('recipe');
      });

      it('"recipe é um objeto', function () {
       expect(response.body.recipe).to.be.an('object');
      });

      it('o objeto contém as chaves, "name", "ingredients", "preparation", "userId", "_id"', function () {
        expect(response.body.recipe).to.have.all
          .keys('name', 'ingredients', 'preparation', 'userId', '_id');
      });
    });
  });

  describe('há falha no cadastro', function () {
    describe('quando "name" nao é informado"', function () {
      describe('a resposta', function () {
        const user = {
          name: 'Jake the Dog',
          email: 'jake@dog.com',
          password: 'adventureTime',
        };
  
        const { name: _, ...userLogInfo } = user;
  
        const newRecipe = {
          ingredients: 'Poẽ o bacon na panqueca direitinho',
          preparation: 'eu vou fazeeeeeeeer',
        };
  
        let login;
        let response;
        let mockConnection;
  
        before(async function () {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          await mockConnection.db('Cookmaster').collection('users').insertOne(user);
          login = await chai.request(server).post('/login').send(userLogInfo);
          const { token } = login.body;
          response = await chai
            .request(server).post('/recipes').send(newRecipe).set({ authorization: token });
        });
  
        after(async function () {
          await mockConnection.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });

        it('retorna o status 400', function () {
         expect(response).to.have.status(400);
        });

        it('retorna um objeto', function () {
          expect(response).to.be.an('object');         
        });

        it('objeto contém a chave "message"', function () {
         expect(response.body).to.have.property('message');
        });

        it('"message" possui o valor "Invalid entries. Try again.', function () {
         expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });
    });

    describe('quando "ingredients" nao é informado"', function () {
      describe('a resposta', function () {
        const user = {
          name: 'Jake the Dog',
          email: 'jake@dog.com',
          password: 'adventureTime',
        };
  
        const { name: _, ...userLogInfo } = user;
  
        const newRecipe = {
          name: 'Jake the Dog',
          preparation: 'eu vou fazeeeeeeeer',
        };
  
        let login;
        let response;
        let mockConnection;
  
        before(async function () {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          await mockConnection.db('Cookmaster').collection('users').insertOne(user);
          login = await chai.request(server).post('/login').send(userLogInfo);
          const { token } = login.body;
          response = await chai
            .request(server).post('/recipes').send(newRecipe).set({ authorization: token });
        });
  
        after(async function () {
          await mockConnection.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });

        it('retorna o status 400', function () {
         expect(response).to.have.status(400);
        });

        it('retorna um objeto', function () {
          expect(response).to.be.an('object');         
        });

        it('objeto contém a chave "message"', function () {
         expect(response.body).to.have.property('message');
        });

        it('"message" possui o valor "Invalid entries. Try again.', function () {
         expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });
    });

    describe('quando "preparation" nao é informado"', function () {
      describe('a resposta', function () {
        const user = {
          name: 'Jake the Dog',
          email: 'jake@dog.com',
          password: 'adventureTime',
        };
  
        const { name: _, ...userLogInfo } = user;
  
        const newRecipe = {
          name: 'Jake the Dog',
          ingredients: 'Poẽ o bacon na panqueca direitinho',
        };
  
        let login;
        let response;
        let mockConnection;
  
        before(async function () {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          await mockConnection.db('Cookmaster').collection('users').insertOne(user);
          login = await chai.request(server).post('/login').send(userLogInfo);
          const { token } = login.body;
          response = await chai
            .request(server).post('/recipes').send(newRecipe).set({ authorization: token });
        });
  
        after(async function () {
          await mockConnection.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });

        it('retorna o status 400', function () {
         expect(response).to.have.status(400);
        });

        it('retorna um objeto', function () {
          expect(response).to.be.an('object');         
        });

        it('objeto contém a chave "message"', function () {
         expect(response.body).to.have.property('message');
        });

        it('"message" possui o valor "Invalid entries. Try again.', function () {
         expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });
    });

    describe('quando o "token" não é válido', function () {
      describe('a resposta', function () {
        let response;
        let mockConnection;
  
        before(async function () {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          response = await chai
            .request(server).post('/recipes').send({}).set({ authorization: 'invalidToken' });
        });
  
        after(async function () {
          await mockConnection.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });
        it('retorna o status 401', function () {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', function () {
          expect(response.body).to.be.an('object');
        });

        it('objeto contém a chave "message"', function () {
          expect(response.body).to.have.property('message');
        });

        it('"message" possui o valor "jwt malformed', function () {
          expect(response.body.message).to.be.equal('jwt malformed');
        });
      });
    });

    describe('quando o "token" não é informado', function () {
      describe('a resposta', function () {
        let response;
        let mockConnection;
  
        before(async function () {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          response = await chai
            .request(server).post('/recipes').send({});
        });
  
        after(async function () {
          MongoClient.connect.restore();
        });
        it('retorna o status 401', function () {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', function () {
          expect(response.body).to.be.an('object');
        });

        it('objeto contém a chave "message"', function () {
          expect(response.body).to.have.property('message');
        });

        it('"message" possui o valor "missing auth token"', function () {
          expect(response.body.message).to.be.equal('missing auth token');
        });
      });
    });
  });
});