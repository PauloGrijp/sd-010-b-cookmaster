const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/server');
chai.use(chaiHttp);
const {expect} = chai

describe('POST /recipes', () => {
  let connectionMock;
  before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(async () => {
    MongoClient.connect.restore();
  });
  
  describe('Quando não é passada nome, ingredients e preparation', () => {
    let response;
    before(async () => {
        response = await chai.request(server).post('/recipes').send({})
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
    /* let response = {}; */
    /* const DBServer = new MongoMemoryServer(); */
   /*  before(async () => { */
      let response;
      before(async () => {
        response = await chai.request(server).post('/recipes').send({
            name: "nugettuva",
            ingredients: "nugetts e uva",
            preparation: "10 minutos"})
        });
        /*  response = await chai.request(server)
            .post('/recipes')
            .send({
              
            }); */
   /*  }); */
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