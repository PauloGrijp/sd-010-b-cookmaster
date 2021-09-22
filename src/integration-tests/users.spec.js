const MongoClient = require('mongodb/lib/mongo_client');
const sinon = require('sinon')
const chai = require('chai');

const { getConnection } = require('./connectionMock');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app')
// EXEMPLO DE CONECÇÃO BANCO

// let connectionMock;
// before(async () => {
//   connectionMock = await getConnection();
//   sinon.stub(MongoClient, 'connect').resolves(connectionMock);
// });

// after(() => {
//   MongoClient.connect.restore();
// })

// REQUEST 

// let response; 

// before(async () => {
//   response = await chai.request(app)
//     .post('/users')
//     .send({})
// })

// expect(response.body)...

//GET TOKEN 

// let respons;
// before(async() => {
//   const token = await chai.request(app).post('/login').send({user}).then((response) => response.token)

// response = await chai.request(app).get('/login').set('authorization', token)
// })

describe('POST /users', () => {
  describe('Quando name, email ou passowrd não são informados', () => {
    let response;
    before(async () => {
      response = await chai.request(app).post('/users').send({});
    });

    it('Retorna status HTTP 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });
  });

  describe('Verifica se o campo email é único', () => {
    let connectionMock;
    let response;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({
          name: 'name-fake',
          email: 'email@email.com',
          password: '12345678',
          role: 'user',
        });

      response = await chai.request(app).post('/users').send({
        name: 'name-fake',
        email: 'email@email.com',
        password: '12345678',
      });

    });

    after(() => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users')
        .deleteOne({ email: 'email@email.com' })
    })

    it('Retorna status HTTP 409', () => {
      expect(response).to.have.status(409);
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('Email already registered')
    });

  });

  describe('Verifica se foi possivel cadastrar com sucesso', () => {
    let response;
    before(async () => {
      response = await chai.request(app).post('/users').send({
        name: 'name-ok',
        email: 'email@email.com',
        password: '12345678',
      });
    });

    it('Retorna status HTTP 201', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade "user"', () => {
      expect(response.body).to.have.a.property('user');
    });

    it('A propriedade "user" não retorna vazio', () => {
      expect(response.body.user).not.to.be.empty;
    });
  });
});

describe('POST, /login', () => {
  describe('Quando email ou passowrd não são informados', () => {
    let response;
    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('Retorna status HTTP 401', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Quando email ou passowrd estão incorretos', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login')
        .send({
          email: 'email-fake-wrong',
          password: '123',
        });
    });

    it('Retorna status HTTP 401', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('Verifica se o login é realizado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login')
        .send({
          email: 'email@email.com',
          password: '12345678',
        });
    });

    it('Retorna status HTTP 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade "token"', () => {
      expect(response.body).to.have.a.property('token');
    });

    it('A propriedade "token" não pode ser vazia', () => {
      expect(response.body.token).to.be.empty;
    });
  });

  describe('Verifica se é possivel logar o usuario admin com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login')
        .send({
          email: 'root@email.com',
          password: 'admin',
        });
    });

    it('Retorna status HTTP 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade "token"', () => {
      expect(response.body).to.have.a.property('token');
    });

    it('A propriedade "token" não pode ser vazia', () => {
      expect(response.body.token).to.be.empty;
    });
  });
});
