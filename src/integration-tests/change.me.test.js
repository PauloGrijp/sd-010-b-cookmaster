const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Requisito 11', () => {
   describe('quando é criado com sucesso', () => {
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
                   name: 'Janaina',
                   email: 'Jana@gmail.com',
                   password: 'senha123'
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

       it('o objeto possui a propriedade "name"', () => {
           expect(response.body.user).to.have.property('name');
       });

       it('o objeto possui a propriedade "email"', () => {
        expect(response.body.user).to.have.property('email');
       });

       it('o objeto possui a propriedade "role"', () => {
          expect(response.body.user).to.have.property('role');
       });

       it('o objeto possui a propriedade "_id"', () => {
        expect(response.body.user).to.have.property('_id');
      });

       it('a propriedade "name" possui o texto "Janaina"',
             () => {expect(response.body.user.name).to.be.equal('Janaina')}
       );
   });
});