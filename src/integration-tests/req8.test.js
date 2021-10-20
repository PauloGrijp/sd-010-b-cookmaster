const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const server = require('../api/app');

const { getConnection } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa o endpoint para apagar uma receita', function () {
  describe('quando uma receita é apagada com sucesso', function () {
    describe('a resposta', function () {
      const user = {
        name: 'Jake the Dog',
        email: 'jake@dog.com',
        password: 'adventureTime',
      };

      const { name: _, ...userLogInfo } = user;
      
      const recipe = {
        name: 'Arroz Doce',
        ingredients: 'arroz, canela, leite, açucar',
        preparation: 'mexe tudo',
      };

      let mockConnection;
      let response;

      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai
          .request(server).post('/login').send(userLogInfo);
        const { body: { recipe: { _id } } } = await chai
          .request(server).post('/recipes').send(recipe).set({ authorization: token });
        response = await chai.request(server).delete(`/recipes/${_id}`).set({ authorization: token });
      });
      
      after(async function () {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });
      
      it('retorna o status 204', async function () {
        expect(response).to.have.status(204);
      });
      
      it('retorna um objeto', function () {
        expect(response.body).to.be.an('object');
      });
      
      it('o objeto é ser vazio', function () {
        expect(response.body).to.be.empty;
      });
    });
  });

  describe('quando o ID é inválido', function () {
    describe('a resposta', function () {
      const user = {
        name: 'Jake the Dog',
        email: 'jake@dog.com',
        password: 'adventureTime',
      };

      const { name: _, ...userLogInfo } = user;
      
      const recipe = {
        name: 'Arroz Doce',
        ingredients: 'arroz, canela, leite, açucar',
        preparation: 'mexe tudo',
      };

      const updateRecipe = {
        name: 'Panquecas',
        ingredients: 'Leite, ovo, fermento, farinha',
        preparation: 'google',
      };

      let mockConnection;
      let response;

      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai
          .request(server).post('/login').send(userLogInfo);
        response = await chai.request(server).delete('/recipes/999').set({ authorization: token });
      });
      
      after(async function () {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 404', function () {
        expect(response).to.have.status(404);
      });

      it('retorna um objeto', function () {
       
      });

      it('objeto possui a chave "message"', function () {
       
      });

      it('"message" possui o valor "recipe not found', function () {
       
      });
    });
  });
});