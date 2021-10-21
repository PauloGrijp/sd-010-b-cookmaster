const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai

describe('Testando a rota /users', () => {
  describe('Quando usuário é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Ricardo Augusto',
          email: 'trybe@betrybe.com',
          password: 'senha123'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Retorna o código de status 201 e o objeto usuário', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('O Objeto contém chave "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('O Objeto contem as keys "name", "email", "role"', () => {
      expect(response.body.user).to.have.all.keys('name', 'email', 'role');
    });

    it('O objeto não está vazio', () => {
      expect(response.body).to.be.not.empty;
    })


  });
});

describe('Testando a rota /login', () => {
  describe('Usuário logado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Ricardo Augusto',
          email: 'trybe@betrybe.com',
          password: 'senha123'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Permite efetuar login com o usuário criado anteriormente', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'trybe@betrybe.com',
          password: 'senha123'
        });

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('token');
    });

    it('Não permite realizar o login com a senha errada', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'trybe@betrybe.com',
          password: 'senha123'
        });

      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
    });

    it('"message" possui o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });

    it('Não permite realizar o login com o email errado', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'whind@tests.com',
          password: 'senha123'
        });

      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
    });

    it('"message" possui o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  })
})



describe('Testando a rota /recipes', () => {
  describe('Usuário logado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Ricardo Augusto',
          email: 'trybe@betrybe.com',
          password: 'senha123'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Permite criar uma receita se estiver logado', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'trybe@betrybe.com',
          password: 'senha123'
        });

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', response.body.token)
        .send({
          name: 'Burguer',
          ingredients: 'Blend bovino 120g, cheddar, bacon',
          preparation: 'Frie everything'
        });

      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('recipe');

    });

    it('Permite buscar todas as receitas sem estar logado', async () => {
      response = await chai.request(server)
        .get('/recipes')

      expect(response).to.have.status(200);
      expect(response.body).to.be.be.an('array');

    });

    it('Permite buscar uma receita por id sem estar logado', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'trybe@betrybe.com',
          password: 'senha123'
        });

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', response.body.token)
        .send({
          name: 'Burguer',
          ingredients: 'Blend bovino 120g, cheddar, bacon',
          preparation: 'Frie everything'
        });

      response = await chai.request(server)
        .get(`/recipes/${response.body.recipe._id}`)

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('ingredients');

    });

    it('Permite deletar uma receita se estiver logado', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'trybe@betrybe.com',
          password: 'senha123'
        });

      const token = response.body.token;

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'Burguer',
          ingredients: 'Blend bovino 120g, cheddar, bacon',
          preparation: 'Frie everything'
        });

      response = await chai.request(server)
        .delete(`/recipes/${response.body.recipe._id}`)
        .set('authorization', token)

      expect(response).to.have.status(204);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('com a mensagem correta', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});