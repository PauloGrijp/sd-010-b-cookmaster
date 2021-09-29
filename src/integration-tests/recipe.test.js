const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const DB_NAME = 'Cookmaster';
const USERS_COLLECTION = 'users';
const RECIPES_COLLECTION = 'recipes';

const { MongoClient } = require('mongodb');
const { dbConnect, dbDisconnect } = require('./connectionMock');
const { code, error } = require('../schema');
const app = require('../api/app');

describe('POST /recipes', () => {
  let connectionMock;

  const recipeVailid = {
    name: 'banana caramelizada',
    ingredients: 'banana, açúcar',
    preparation: 'coloque o açúcar na frigideira até virar caramelo e jogue a banana',
  };

  const user = {
    name: 'Batista',
    email: 'brunobatista@gmail.com',
    password: '123456789'
  };

  const userLogin = {
    email: 'brunobatista@gmail.com',
    password: '123456789'
  };

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

  describe('Quando é possivel cadastrar a receita com sucesso', () => {
    let response;

    before(async () => {
      const userCollection = connectionMock.db(DB_NAME).collection(USERS_COLLECTION);

      await userCollection.insertOne(user);

      const authRequest = await chai.request(app).post('/login').send(userLogin);
      const token = authRequest.body.token;

      response = await chai.request(app)
        .post('/recipes')
        .set('authorization', token)
        .send(recipeVailid);
    });

    it('retorna o código status 201', () => {
      expect(response).to.be.status(code.HTTP_CREATED);
    });

    it('retona um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('o objeto possuí a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('a propriedade "recipe" é um objeto', () => {
      expect(response.body.recipe).to.be.an('object');
    });

    it('a propriedade "recipe" retorna as propiedades "name", "ingredients", "preparation", "userId" e o "_id', () => {
      expect(response.body.recipe).to.contains.keys('name', 'ingredients', 'preparation', 'userId', '_id');
    });
  });
  
  describe('Quando não é passo os campos obrigatórios', () => {
    let response;
    const recipeInvalid = {
      name: 'banana caramelizada',
      preparation: 'coloque o açúcar na frigideira até virar caramelo e jogue a banana',
    }

    before(async () => {
      const userCollection = connectionMock.db(DB_NAME).collection(USERS_COLLECTION);

      userCollection.insertOne(user);
      
      const authRequest = await chai.request(app).post('/login').send(userLogin);
      const token = authRequest.body.token;

      response = await chai.request(app)
        .post('/recipes')
        .set('authorization', token)
        .send(recipeInvalid);
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
});

describe('GET /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => dbDisconnect());

  describe('Deve ser possível vizualiar todas as receitas cadastradas', () => {
    let response;

    before(async () => {
      response = await chai.request(app).get('/recipes').send();
    });

    it('retorna o código status 200', () => {
      expect(response).to.be.status(code.HTTP_OK_STATUS);
    });

    it('retornar um array com as receitas', () => {
      expect(response.body).to.be.an('array');
    });
  });
});

describe('GET /recipes/:id', () => {
  let connectionMock;

  const recipe = {
    name: 'banana caramelizada',
    ingredients: 'banana, açúcar',
    preparation: 'coloque o açúcar na frigideira até virar caramelo e jogue a banana',
  };

  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => dbDisconnect());

  describe('Deve ser possivel vizualizar a receita pelo seu "id"', () => {
    let response;
    
    before(async () => {
      const userCollection = await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION);

      userCollection.insertOne(recipe);

      const getRecipe = await chai.request(app).get('/recipes').send();
      const id = getRecipe.body[0]['_id'];
      
      response = await chai.request(app).get(`/recipes/${ id }`)
    });

    it('retorna o código status 200', () => {
      expect(response).to.be.status(code.HTTP_OK_STATUS);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto deve conter a propriedade "id" da receita', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto deve conter a propriedade "id" igual ao "id" da url', () => {
      const idUrl = response.req.path.slice(9);

      expect(response.body['_id']).to.be.equal(idUrl);
    });
  });
  
});
