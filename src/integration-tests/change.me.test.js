const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai

describe('Teste de integração', () => {
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
            name: 'Ricardo',
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

    it('Objeto contém chave "user"', () => {
        expect(response.body).to.have.property('user');
    });

    it('A chave "user" contem as propriedades "name", "email", "role" e "_id"', () => {
        expect(response.body.user).to.have.all.keys('name', 'email', 'role', '_id');
    });

    it('A chave "role" deve possuir o valor "user"', () => {
        expect(response.body.user.role).to.be.equal('user');
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
          password: 'superForte'
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

    it('Não permite criar um novo admin se o usuário não for admin', async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
          email: 'trybe@betrybe.com',
          password: 'senha123'
      });

      response = await chai.request(server)
      .post('/users/admin')
      .set('authorization', response.body.token)
      .send({
          name: 'Novo ADM',
          email: 'adm@tests.com.br',
          password: 'aSenhaMaisForteDeTodas'
      });

      expect(response).to.have.status(403);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Only admins can register new admins');

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
  });
})