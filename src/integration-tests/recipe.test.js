const { MongoClient } = require("mongodb");
const chai = require("chai");
const sinon = require("sinon");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../api/app");
const { mockConnection } = require("./connectionMock");

const { expect } = chai;

describe('POST /recipes', () => {
  describe('quando name, ingredients e preparation não são informados', () => {
    let response;
    let connectionMock;

    // before(async () => {
    //   response = await chai.request(app).post("/recipes").send({});
    // });

    before(async () => {
      connectionMock = await mockConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock
        .db('Cookmaster')
        .collection('users')
        .insertOne({
          name: "name-fake",
          email: "email@email.com",
          password: "12345678",
          role: "user",
        });

      const login = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'email@email.com',
        password: "12345678",
      });

      const token = login.body.token;

      response = await chai
        .request(app)
        .post('/recipes')
        .set('authorization', token)
        .send({});
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .deleteOne({ email: "email@email.com" });
      await connectionMock
        .db("Cookmaster")
        .collection("recipes")
        .deleteMany({});
    });    

    it('retorna status HTTP 400', () => {
      expect(response).to.have.status(400);
    });
    console.log(response);

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });
  });

  describe('quando não é possível cadastrar uma receita com token inválido', () => {
    let response;
  
    before(async () => {
      response = await chai
        .request(app)
        .post("/recipes")
        .send({ 
          name: "fake-name",
          ingredients: "fake-ing",
          preparation: "fake-prep"
        })
        .set('authorization', 'fake-token');
    });

    it('retorna status HTTP 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });

  describe('quando é possível cadastrar uma receita com sucesso', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await mockConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock
        .db('Cookmaster')
        .collection('users')
        .insertOne({
          name: "name-fake",
          email: "email@email.com",
          password: "12345678",
          role: "user",
        });

      const login = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'email@email.com',
        password: "12345678",
      });

    const token = login.body.token;

      response = await chai
        .request(app)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: "fake-name",
          ingredients: "fake-ing",
          preparation: "fake-prep"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .deleteOne({ email: "email@email.com" });
      await connectionMock
        .db("Cookmaster")
        .collection("recipes")
        .deleteMany({});
    });

    it('retorna status HTTP 201', () => {
      expect(response).to.have.status(201);
    });

    it("retorna um objeto no body", () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada "recipe"', () => {
      expect(response.body).to.have.a.property('recipe');
    });

    it('objeto "recipe" possui uma propriedade chamada "_id"', () => {
      expect(response.body.recipe).to.have.a.property('_id');
    });

  });
});

describe('GET /recipes', () => {

  describe('quando é possível listar todas as receitas sem estar autenticado', () => {
    let response;
    let connectionMock;

    before(async ()=> {
      connectionMock = await mockConnection();
      sinon.stub(MongoClient, "connect").resolves(connectionMock);

      await connectionMock
      .db("Cookmaster")
      .collection("recipes")
      .insertOne({
        name: "fake-name",
        ingredients: "fake-ing",
        preparation: "fake-prep"
      });

      response = await chai.request(app).get('/recipes');   
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("recipes")
        .deleteMany({});
    });

    it('retorna status HTTP 200', () => {
      expect(response).to.have.status(200);
    })
    
  });

    // describe('quando é possível listar uma receita específica', () => {
  //   let response;

  //   it('retorna status HTTP 200', () => {
  //     expect(response).to.have.status(200);
  //   });

  //   it('', () => {});

  //   it('', () => {});
    
  // })

});

describe('GET /recipes/:id', () => {  
  let connectionMock;
  let recipeId;

  before(async () => {
    connectionMock = await mockConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .insertOne({
        name: "name-fake",
        email: "email@email.com",
        password: "12345678",
        role: "user",
      });

   const login = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'email@email.com',
      password: "12345678",
    });

   const token = login.body.token;

   const recipe = await chai
    .request(app)
    .post('/recipes')
    .set('authorization', token)
    .send({
      name: "fake-name",
      ingredients: "fake-ing",
      preparation: "fake-prep"
    });
    recipeId = recipe.body.recipe._id;

    console.log(recipeId);
  });

  after(async () => {
    MongoClient.connect.restore();
    await connectionMock
      .db("Cookmaster")
      .collection("users")
      .deleteOne({ email: "email@email.com" });
    await connectionMock
      .db("Cookmaster")
      .collection("recipes")
      .deleteMany({});
  });

  describe('quando é possível listar uma receita específica', () => {
    let response;

    before(async () => {
      response = await chai.request(app).get(`/recipes/${recipeId}`)      
    });    

    it('retorna status HTTP 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta possui as propriedades "_id" "name", "ingredients", "preparation" e "userId"', () => {
      expect(response.body).to.have.a.property('_id');
      expect(response.body).to.have.a.property('name');
      expect(response.body).to.have.a.property('ingredients');
      expect(response.body).to.have.a.property('preparation');
      expect(response.body).to.have.a.property('userId');
    });    
  });

  describe('quando não é possível listar uma receita que não existe', () => {
    let response;

    before(async () => {
      response = await chai.request(app).get('/recipes/idfake')      
    });    

    it('retorna status HTTP 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

     it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response.body).to.have.a.property('message');
     });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('recipe not found');
    });
    // it('', () => {});
  
    
  })
})
