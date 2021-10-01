const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {expect} = chai
const { MongoClient } = require('mongodb');
const { getConnection, DBServer } = require('./connectionMock');
const server = require('../api/app');


describe('GET /recipes', () => {
  
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();    
  });

  /* CRIA RECEITA SEM TOKEN */
  describe('Quando cria a receita sem token', () => {

    let response = {}
    
    before (async () => {
      response = await chai.request(server).post('/recipes')
      .set({'authorization': ''})
      .send({
        name: 'banana',
        ingredients: 'banana',
        preparation: 'banana'
      });
    });

    it('Deve retornar status 401', () => {
      expect(response).to.have.status(401);
    });

    it('o objeto retorna uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('a propriedade "message" retorna "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });

  /* TOKEN INVÁLIDO */  
  describe('Quando o token enviado é inválido', () => {

    let response = {}

    before(async () => {
      response = await chai.request(server).post('/recipes')
      .set('authorization', 'tokenInvalido')
      .send({
        name: 'banana',
        ingredients: 'banana',
        preparation: 'banana'
      });
    });

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto retorna uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" retorna "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });
  
  describe('Quando os campos nome, ingredientes e preparo não são passados', () => {
    let response = {};

    before(async () => {
      
      const userCollection = await connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        email: 'rafael@trybe.com',
        password: 'password'
      })

      const {body: {token}} = await chai.request(server).post('/login').send({
        email: 'rafael@trybe.com',
        password: 'password'
      })    
      
      response = await chai.request(server).post('/recipes')
      .set({'authorization': token})
      .send({
        name: '',
        ingredients: '',
        preparation: ''
      });      
    });
    
    it('retorna o código de status "400"', () => {
      expect(response).to.have.status(400)
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto retorna uma propriedade "message" ', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade message tem valor "Invalid entries. Try again." ', () => {
      expect(response.body.message).to.have.equal('Invalid entries. Try again.');      
    });
  });

  describe('Quando a receita é criada com sucesso', () => {
    let response;

    before(async () => {
    
      response = await chai.request(server).post('/recipes')
      .set({'authorization': token})
      .send({
        name: 'banana',
        ingredients: 'banana',
        preparation: 'banana'
      });      
    });

    it('retorna código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('objeto de resposta possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });    

    it('a propriedade "message" tem os campos "id, name, ingredientes, preparation, userId"', () => {
      expect(response.body.recipe).to.includes.keys('_id', 'name', 'ingredients', 'preparation', 'userId');
    });
  });
});

describe('GET /recipes/:id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();    
  });

  describe('Quando não encontra uma receita ', () => {
    before( async() => {
      response = await chai.request(server).get(`/recipes/999`)
    })

    it('retorna código de status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.have.a("object");
    });

    it('o objeto retorna uma propriedade "message" ', () => {
      expect(response.body).to.have.property('message');
    });

    it('a proprieda menssage tem o valor "recipe not found"', () => {
      expect(response.body.message).to.be.equal("recipe not found");
    });
  })
  
  describe('quando encontra uma receita', () => {
    let response = {}

    before(async () => {
      // const id = '615754f934d1988249b613ad';
      
      const userCollection = await connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId: id } = await userCollection.insertOne({
       name: 'nomeFake',
       ingredients: 'ingredientFake',
       preparation: 'preparationFake'
      });

      response = await chai.request(server).get(`/recipes/${id}`)    
    })

    it('retorna código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.have.a("object");
    });

    it('retorna uma propriedade chamada "_id", "name", "ingredients", "preparation"', () => {
      expect(response.body).to.have.a.property("_id");
      expect(response.body).to.have.a.property("name");
      expect(response.body).to.have.a.property("ingredients");
      expect(response.body).to.have.a.property("preparation");
    });
  })
})

describe('PUT /recipes/:id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();    
  });

  describe('Erro ao passar um Token inválido', () => {
    let response;

    before(async () => {
      
      const userCollection = await connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId: id } = await userCollection.insertOne({
       name: 'nomeFake',
       ingredients: 'ingredientFake',
       preparation: 'preparationFake'
      });

      response = await chai.request(server).put(`/recipes/${id}`)
      .set({'authorization': 'lotar bah'})
      .send({
        name: 'editar',
        ingredients: 'string',
        preparation: 'string'
      });
    })

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.have.a("object");
    });

    it('o objeto retorna uma propriedade "message" ', () => {
      expect(response.body).to.have.property('message');
    });

    it('a proprieda menssage tem o valor "jwt malformed"', () => {
      expect(response.body.message).to.be.equal("jwt malformed");
    });
  });
  
  describe('Erro ao não passar Token ', () => {
    let response;

    before(async () => {
      const userCollection = await connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId: id } = await userCollection.insertOne({
       name: 'nomeFake',
       ingredients: 'ingredientFake',
       preparation: 'preparationFake'
      });
      response = await chai.request(server).put(`/recipes/${id}`)
      .set({'authorization': '' })
      .send({
        name: 'nomeFake',
        ingredients: 'ingredientFake',
        preparation: 'preparationFake'
      });
      
    })
    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.have.a("object");
    });

    it('o objeto retorna uma propriedade "message" ', () => {
      expect(response.body).to.have.property('message');
    });

    it('a proprieda menssage tem o valor "missing auth token"', () => {
      expect(response.body.message).to.be.equal("missing auth token");
    });
  });
  
  describe('Falta da propriedade name do campo do body inválido', () => {

    let response = {}
    
    before(async () => {
      
      const userCollection = await connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        email: 'rafael@trybe.com',
        password: 'password'
      })

      const { body: { token } } = await chai.request(server).post('/login').send({
        email: 'rafael@trybe.com',
        password: 'password'
      })    
      
      const userCollection = await connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId: id } = await userCollection.insertOne({
       name: 'nomeFake',
       ingredients: 'ingredientFake',
       preparation: 'preparationFake'
      });
      
      response = await chai.request(server).put(`/recipes/${id}`)
      .set({'authorization': token })
      .send({
        name: '',
        ingredients: 'ingredientsFake',
        preparation: 'preparationFake'
      });      
    })
    
  })
  
  describe('Falta da propriedade ingredients do campo do body inválido', () => {

    let response = {}
    
    before(async () => {
      
      const userCollection = await connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        email: 'rafael@trybe.com',
        password: 'password'
      })

      const { body: { token } } = await chai.request(server).post('/login').send({
        email: 'rafael@trybe.com',
        password: 'password'
      })    
      
      const userCollection = await connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId: id } = await userCollection.insertOne({
       name: 'nomeFake',
       ingredients: 'ingredientFake',
       preparation: 'preparationFake'
      });
      
      response = await chai.request(server).put(`/recipes/${id}`)
      .set({'authorization': token })
      .send({
        name: 'nomeFake',
        ingredients: '',
        preparation: 'preparationFake'
      });      
    })
  })

  describe('Falta da propriedade preparation do campo do body inválido', () => {

    let response = {}
    
    before(async () => {
      
      const userCollection = await connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        email: 'rafael@trybe.com',
        password: 'password'
      })

      const { body: { token } } = await chai.request(server).post('/login').send({
        email: 'rafael@trybe.com',
        password: 'password'
      })    
      
      const userCollection = await connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId: id } = await userCollection.insertOne({
       name: 'nomeFake',
       ingredients: 'ingredientFake',
       preparation: 'preparationFake'
      });
      
      response = await chai.request(server).put(`/recipes/${id}`)
      .set({'authorization': token })
      .send({
        name: '',
        ingredients: 'ingredientsFake',
        preparation: ''
      });      
    })
  })
  
  describe('Ao atualizar uma receita', () => {

    let response = {}

    const userCollection = await connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId: id } = await userCollection.insertOne({
       name: 'nomeFake',
       ingredients: 'ingredientFake',
       preparation: 'preparationFake'
      });

    const {body: {token}} = await chai.request(server).post('/login').send({
      name: 'name',
      ingredients: 'ingredients',
      preparation: 'preparation'
    });

    response = await chai.request(server).put(`/recipes/${id}`)

    it('retorna o código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });
    
    it('a propriedade "message" tem os campos "id, name, ingredientes, preparation, userId"', () => {
      expect(response.body.recipe).to.includes.keys('_id', 'name', 'ingredients', 'preparation', 'userId');
    });   
  });
});
  

  // describe('DELETE /recipes/:id', () => {
  //   let connectionMock;

  //   before(async () => {
  //     connectionMock = await getConnection();
  //     sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  //   });

  //   after(async () => {
  //     MongoClient.connect.restore();
  //     await DBServer.stop();    
  //   });
  // })
 