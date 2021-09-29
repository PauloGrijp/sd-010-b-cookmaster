const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const DB_NAME = 'Cookmaster';
const USERS_COLLECTION = 'users';

const { MongoClient } = require('mongodb');
const { dbConnect, dbDisconnect } = require('./connectionMock');
const { code, error } = require('../schema');
const app = require('../api/app');

describe('POST /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(async () => await dbDisconnect());

  describe('Quando o token é inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/recipes')
        .set('authorization', 'err');
    });

    it('retorna o código status 401', () => {
      expect(response).to.be.status(code.HTTP_UNAUTHORIZED);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto deve conter a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" deve possuir a menssagem "jwt malformed"', () => {
      expect(response.body.message).to.be.equal(error.invalidToken);
    });
  });
  
  describe('Quando não é passo os campos obrigatórios', () => {
    let response;
    const recipeInvalid = {
      name: 'banana caramelizada',
      preparation: 'coloque o açúcar na frigideira até virar caramelo e jogue a banana',
    }

    before(async () => {
      await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});

      response = await chai.request(app)
        .post('/recipe')
        .send(recipeInvalid);
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});
    });

    it('retorna código status 400', () => {
      expect(response).to.be.status(code.HTTP_BAD_REQUEST);
    });

    it('retorna um objeto com a propriedade "message"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possuí a mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal(error.invalidEntries);
    });
    
  });

  describe('Quando é possivel cadastrar a receita com sucesso', () => {
    let response;

    before(async () => {});

    it('retorna o código status 201', () => {});
    it('retona um objeto', () => {});
    it('o objeto possuí a propriedade "recipe"', () => {});
    it('a propriedade "recipe" é um objeto', () => {});
    it('a propriedade "recipe" retorna as propiedades "name", "ingredients", "preparation", "userId" e o "_id', () => {});
  });
});
