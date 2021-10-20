const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const { MongoClient, ObjectId } = require('mongodb');
const server = require('../api/app');

const { getConnection } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa o endpoint de cadastro de imagem de receita', function () {
  describe('quando o cadastro é feito com sucesso', function () {
    describe('a resposta', function () {
      const user = {
        name: 'Ratatuille',
        email: 'rata@tuille.com',
        password: 'chef',
      };

      const { name: _, ...userLoginInfo } = user;

      const recipe = {
        name: 'Suflair',
        ingredients: 'oef, lait',
        preparation: 'google',
      };

      let mockConnection;
      let response;
      before(async function () {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        // sinon.stub(multer, 'diskStorage')
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai.request(server).post('/login').send(userLoginInfo);
        const { insertedId } = await mockConnection.db('Cookmaster').collection('recipe').insertOne(recipe);
        response = await chai
          .request(server)
          .put(`/recipes/${insertedId}/image`)
          .set({ authorization: token })
          .attach('image', fs.readFileSync(path.join(__dirname, '..', 'uploads', 'ratinho.jpg')), `${insertedId}.jpg`);
      });

      after(async function () {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipe').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 200', async function () {
        expect(response).to.have.status(200);
      });
    });   
  });
});