const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai

//exemplo de teste
describe('Rotas: users, login, admin, recipes', () => {

  describe('quando é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
            name: 'jane',
            email: 'test@tests.com.br',
            password: 'senhaSuperForte'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 201 e o usuário', () => {
      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('user');
    });

    it('Consegue realizar o login com o usuário criado', async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
          email: 'test@tests.com.br',
          password: 'senhaSuperForte'
      });

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('token');
    });

    it('Não consegue realizar o login com a senha errada', async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
          email: 'test@tests.com.br',
          password: 'senhaSuperFore'
      });

      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
    });

    it('Não consegue realizar o login com o email errado', async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
          email: 'test@tests.com.b',
          password: 'senhaSuperForte'
      });

      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
    });

    it('Não consegue criar um novo admin se o usuário não for outro admin', async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
          email: 'test@tests.com.br',
          password: 'senhaSuperForte'
      });

      response = await chai.request(server)
      .post('/users/admin')
      .set('authorization', response.body.token)
      .send({
          name: 'Novo Administrador',
          email: 'adm@novo.com.br',
          password: 'aSenhaMaisForteDeTodas'
      });

      expect(response).to.have.status(403);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Only admins can register new admins');

    });

    it('Consegue criar uma receita se estiver logado', async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
          email: 'test@tests.com.br',
          password: 'senhaSuperForte'
      });

      response = await chai.request(server)
      .post('/recipes')
      .set('authorization', response.body.token)
      .send({
        name: 'Burguer',
        ingredients: 'Burguer, eggs',
        preparation: 'Frie everything'
      });

      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('recipe');

    });

    it('Consegue buscar todas as receitas sem estar logado', async () => {
      response = await chai.request(server)
      .get('/recipes')

      expect(response).to.have.status(200);
      expect(response.body).to.be.be.an('array');

    });
    
    it('Consegue buscar uma receita por id sem estar logado', async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
          email: 'test@tests.com.br',
          password: 'senhaSuperForte'
      });

      response = await chai.request(server)
      .post('/recipes')
      .set('authorization', response.body.token)
      .send({
        name: 'Burguer',
        ingredients: 'Burguer, eggs',
        preparation: 'Frie everything'
      });

      response = await chai.request(server)
      .get(`/recipes/${response.body.recipe._id}`)

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('ingredients');

    });

    it('Consegue deletar uma receita se estiver logado', async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
          email: 'test@tests.com.br',
          password: 'senhaSuperForte'
      });

      const token = response.body.token;

      response = await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send({
        name: 'Burguer',
        ingredients: 'Burguer, eggs',
        preparation: 'Frie everything'
      });

      response = await chai.request(server)
      .delete(`/recipes/${response.body.recipe._id}`)
      .set('authorization', token)

      expect(response).to.have.status(204);

    });

  });
});
