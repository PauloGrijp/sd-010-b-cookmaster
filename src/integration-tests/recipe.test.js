const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const fs = require('fs');
const patch = require('path');
const { expect } = chai;

const { MongoClient } = require('mongodb');
const { dbConnect, dbDisconnect } = require('./connectionMock');
const { code, error } = require('../schema');
const app = require('../api/app');

chai.use(chaiHttp);

const DB_NAME = 'Cookmaster';
const USERS_COLLECTION = 'users';
const RECIPES_COLLECTION = 'recipes';

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

    after(async () => {
      await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION).deleteMany({})
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

describe('PUT /recipes/:id', () => {
  let connectionMock;
  let idRecipe;

  const chikenRecipe = {
    name: 'Receita de frango do Jacquin',
    ingredients: 'Frango',
    preparation: '10 min no forno',
  };

  const updateChikenRecipe = {
    name: 'Receita de frango do Jacquin',
    ingredients: 'Frango',
    preparation: '30 min no forno',
  };

  const login = {
    email: 'brunobatista@gmail.com',
    password: '123456789'
  }

  const invalidToken = '9999'

  const user = {
    name: 'Batista',
    email: 'brunobatista@gmail.com',
    password: '123456789',
    role: 'admin'
  }

  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const db = await connectionMock.db(DB_NAME).collection(USERS_COLLECTION);
    
    await db.insertOne(user);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});

    await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION).deleteMany({});

    await dbDisconnect();
  });

  describe('A receita não pode ser atualizado sem estar autenticado', () => {
    let response;

    before(async () => {
      const recipeColletion = await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION);

      await recipeColletion.insertOne(chikenRecipe);
      
      const findRecipe = await chai.request(app).get('/recipes').send();
      idRecipe = findRecipe.body[0]['_id']
      
      response = await chai.request(app).put(`/recipes/${idRecipe}`).send(updateChikenRecipe);
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION).deleteMany({});
    });

    it('retorna código status 401 se não estiver logado', () => {
      expect(response).to.be.status(code.HTTP_UNAUTHORIZED);
    });

    it('retornar um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possuí a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a pripriedade message possuí a mensagem "missing auth token"', () => {
      expect(response.body.message).to.be.equal(error.noAuthentication);
    });
  });

  describe('A receita não pode ser atualizado com o token inválido', () => {
    let response;
    
    before(async () => {
      response = await chai.request(app).put(`/recipes/${idRecipe}`).set('authorization', invalidToken).send(updateChikenRecipe);
    });

   it('retorna código de status 401', () => {
     expect(response).to.be.status(code.HTTP_UNAUTHORIZED);
   });

   it('retorna um objeto', () => {
     expect(response.body).to.be.an('object');
   });

   it('o objeto deve possuir a propriedade "message"', () => {
     expect(response.body).to.have.property('message');
   });

   it('a propriedade "message" deve possuir a mensagem "jwt malformed"', () => {
     expect(response.body.message).to.be.equal(error.invalidToken);
   });
  });

  describe('A receita só pode ser atualizada pelo usuário que a inseriu ou o "admin"', () => {
    let response;
    
    before(async () => {
      const requestLogin = await chai.request(app).post('/login').send(login);
      const userToken = await requestLogin.body.token;

      const registerRecipe = await chai.request(app).post('/recipes').set('authorization', userToken).send(chikenRecipe);
      idRecipe = registerRecipe.body.recipe['_id'];

      response = await chai.request(app).put(`/recipes/${idRecipe}`).set('authorization', userToken).send(updateChikenRecipe);
    });

    it('retornar código status 200', () => {
      expect(response).to.be.status(code.HTTP_OK_STATUS);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna as informações da receita atualizadas', () => {
      expect(response.body.preparation).to.be.equal(updateChikenRecipe.preparation);
    });
  });
});

describe('DELETE /recipes/:id', () => {
  let connectionMock;
  let idRecipe;

  const chikenRecipe = {
    name: 'Receita de frango do Jacquin',
    ingredients: 'Frango',
    preparation: '10 min no forno',
  };

  const login = {
    email: 'brunobatista@gmail.com',
    password: '123456789'
  }

  const user = {
    name: 'Batista',
    email: 'brunobatista@gmail.com',
    password: '123456789',
    role: 'admin'
  }

  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const connect = await connectionMock.db(DB_NAME).collection(USERS_COLLECTION);

    await connect.insertOne(user);
  });

  after(async () => dbDisconnect());

  describe('A receita só pode ser excluída caso o usuário esteja logado e o token JWT validado', () => {
    let response;

    before(async () => {
      const db = await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION);

      const test = await db.insertOne(chikenRecipe);

      idRecipe = await test.insertedId;

      response = await chai.request(app).delete(`/recipes/${idRecipe}`).send();
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION).deleteMany({});
    });

   it('retorna código status 401', () => {
     expect(response).to.be.status(code.HTTP_UNAUTHORIZED);
   });
   
   it('retorna um objeto', () => {
     expect(response.body).to.be.an('object');
   });
   
   it('o objeto deve conter a propriedade "message"', () => {
     expect(response.body).to.have.property('message');
   });

   it('a propriedade "message" dever conter a mensagem "missing auth token"', () => {
     expect(response.body.message).to.be.equal(error.noAuthentication);
   });
  });

  describe('A receita só pode ser excluída caso pertença ao usuário logado, ou caso o usuário logado seja um admin', () => {
    let response;

    before(async () => {
      const db = await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION);

      const loginUser = await chai.request(app).post('/login').send(login)
      const userToken = await loginUser.body.token

      const { insertedId } = await db.insertOne(chikenRecipe);

      response = await chai.request(app).delete(`/recipes/${insertedId}`).send().set('authorization', userToken);
    });

   it('retorna código status 204', () => {
     expect(response).to.be.status(code.HTTP_NO_CONTENT);
   });

   it('não tem retorno no body', () => {
     expect(response.body).to.empty;
   });

   it('a receita não deve mais existir no banco de dados', async () => {
    response = await chai.request(app).get(`/recipes/${idRecipe}`).send();

    expect(response).to.be.status(code.HTTP_NOT_FOUND);
   });
  });
});

describe('PUT /recipes/:id/image/', () => {
  let connectionMock;
  let userToken;
  let idRecipe;

  const chikenRecipe = {
    name: 'Receita de frango do Jacquin',
    ingredients: 'Frango',
    preparation: '10 min no forno',
  };

  const login = {
    email: 'brunobatista@gmail.com',
    password: '123456789'
  }

  const user = {
    name: 'Batista',
    email: 'brunobatista@gmail.com',
    password: '123456789',
    role: 'admin'
  }

  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const userDB = await connectionMock.db(DB_NAME).collection(USERS_COLLECTION);

    await userDB.insertOne(user);

    const { body: {token} } = await chai.request(app).post('/login').send(login);
    userToken = token;

    const recipeDB = await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION);

    const {insertedId} = await recipeDB.insertOne(chikenRecipe);
    idRecipe = insertedId;
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});
    await connectionMock.db(DB_NAME).collection(RECIPES_COLLECTION).deleteMany({});
    await dbDisconnect();
  });

  describe('É possível adicionar uma imagem na receita', () => {
    let response;

    before(async () => {
      console.log(patch.join(__dirname, '..', 'uploads', 'ratinho.jpg'));
      response = await chai.request(app)
        .put(`/recipes/${idRecipe}/image/`)
        .set('authorization', userToken)
        .attach('image', fs.readFileSync(patch.join(__dirname, '..', 'uploads', 'ratinho.jpg')), 'ratinho.jpg');

    });

    it('retona código status 200', () => {
      expect(response).to.be.status(code.HTTP_OK_STATUS);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto deve conter a propriedade image', () => {
      expect(response.body).to.have.property('image');
    });
  });
});
