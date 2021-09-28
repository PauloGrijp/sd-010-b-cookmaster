const { MongoClient } = require("mongodb");
const chai = require("chai");
const sinon = require("sinon");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../api/app");
const { mockConnection } = require("./connectionMock");

const { expect } = chai;

describe("POST /users", () => {
  describe("quando name, email e password não são informados", () => {
    let response;

    before(async () => {
      response = await chai.request(app).post("/users").send({});
    });

    it("retorna status HTTP 400", () => {
      expect(response).to.have.status(400);
    });

    it("retorna um objeto no body", () => {
      expect(response.body).to.be.an("object");
    });

    it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response.body).to.have.a.property("message");
    });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal("Invalid entries. Try again.");
    });
  });

  describe("quando o email não é único", () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await mockConnection();

      sinon.stub(MongoClient, "connect").resolves(connectionMock);
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .insertOne({
          name: "name-fake",
          email: "email@email.com",
          password: "12345678",
          role: "user",
        });

      response = await chai.request(app).post("/users").send({
        name: "name-fake",
        email: "email@email.com",
        password: "12345678",
      });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .deleteOne({ email: "email@email.com" });
    });

    it("retorna status HTTP 409", () => {
      expect(response).to.have.status(409);
    });

    it("retorna um objeto no body", () => {
      expect(response.body).to.be.an("object");
    });

    it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response.body).to.have.a.property("message");
    });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal("Email already registered");
    });
  });

  describe("quando é possível cadastrar com sucesso", () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await mockConnection();
      sinon.stub(MongoClient, "connect").resolves(connectionMock);

      response = await chai
        .request(app)
        .post("/users")
        .send({ 
          name: "name-ok",
          email: "email@email.com",
          password: "12345678",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .deleteOne({ email: "email@email.com" });
    });

    it("retorna status HTTP 201", () => {
      expect(response).to.have.status(201);
    });

    it("retorna um objeto no body", () => {
      expect(response.body).to.be.an("object");
    });

    it('objeto de resposta possui uma propriedade chamada "user"', () => {
      expect(response.body).to.have.a.property("user");
    });

    it('a propriedade "user" não retorna vazio', () => {
      expect(response.body.user).not.to.be.empty;
    });
  });
});

describe('POST /login', () => {

  describe("quando email e password não são informados", () => {
    let response;

    before(async () => {
      response = await chai.request(app).post("/login").send({});
    });

    it("retorna status HTTP 401", () => {
      expect(response).to.have.status(401);
    });

    it("retorna um objeto no body", () => {
      expect(response.body).to.be.an("object");
    });

    it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response.body).to.have.a.property("message");
    });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal("All fields must be filled");
    });
  });

  describe("quando email ou password estão incorretos", () => {
    let response;

    before(async () => {
      response = await chai
        .request(app)
        .post("/login")
        .send({ 
          email: "email-fake",
          password: "12345",
        });
    });

    it("retorna status HTTP 401", () => {
      expect(response).to.have.status(401);
    });

    it("retorna um objeto no body", () => {
      expect(response.body).to.be.an("object");
    });

    it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response.body).to.have.a.property("message");
    });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal("Incorrect username or password");
    });
  });

  describe("quando o login é realizado com sucesso", () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await mockConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock
      .db("Cookmaster")
      .collection("users")
      .insertOne({
        name: "name-fake",
        email: "email@email.com",
        password: "12345678",
        role: "user",
      });

      response = await chai
        .request(app)
        .post("/login")
        .send({ 
          email: "email@email.com",
          password: "12345678",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .deleteOne({ email: "email@email.com" });
    });

    it("retorna status HTTP 200", () => {
      expect(response).to.have.status(200);
    });

    it("retorna um objeto no body", () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada "token"', () => {
      expect(response.body).to.have.a.property('token');
    });

    it('a propriedade "token" não é vazia', () => {
      expect(response.body.token).not.to.be.empty;
    });
  });

  describe("quando é possível fazer login com sucesso com admin", () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await mockConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .insertOne({
          name: "admin",
          email: "root@email.com",
          password: "admin",
          role: "admin",
        });

      response = await chai
        .request(app)
        .post("/login")
        .send({ 
          email: "root@email.com",
          password: "admin",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .deleteOne({ email: "root@email.com" });
    });

    it("retorna status HTTP 200", () => {
      expect(response).to.have.status(200);
    });

    it("retorna um objeto no body", () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada "token"', () => {
      expect(response.body).to.have.a.property('token');
    });

    it('a propriedade "token" não é vazia', () => {
      expect(response.body.token).not.to.be.empty;
    });
  });

  describe('quando não é possível cadastrar um usuário admin sem estar autenticado como admin', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await mockConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .insertOne({
          name: "fake-name",
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
        // console.log(token);

      response = await chai
        .request(app)
        .post("/users/admin")
        .set('authorization', token)
        .send({ 
          name: 'admin',
          email: "newAdmin@email.com",
          password: "newAdmin",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .deleteMany({});
    });

      it('retorna status HTTP 403', () => {
        expect(response).to.have.status(403);
      });

      it('retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('objeto de resposta possui uma propriedade chamada "message"', () => {
        expect(response.body).to.have.a.property('message');
      });

      it('a propriedade "message" possui uma mensagem de erro adequada', () => {
        expect(response.body.message).to.be.equal('Only admins can register new admins');
      });
  });

  describe('quando é possível cadastrar um usuário admin', () => {
    let response;
    let authorization;

    before(async () => {
      connectionMock = await mockConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .insertOne({
          name: "admin",
          email: "root@email.com",
          password: "admin",
          role: "admin",
        });

        const login = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'root@email.com',
            password: "admin",
          });

        const token = login.body.token;
        // console.log(token);

      response = await chai
        .request(app)
        .post("/users/admin")
        .set('authorization', token)
        .send({ 
          name: 'newAdmin',
          email: "newAdmin@email.com",
          password: "newAdmin",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db("Cookmaster")
        .collection("users")
        .deleteMany({});
    });

    it('retorna status HTTP 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada "user"', () => {
      expect(response.body).to.have.a.property('user');
    });

    it('objeto "user" possui as propriedade "name", "email", "role", "_id"', () => {
      expect(response.body.user).to.have.a.property('name');
      expect(response.body.user).to.have.a.property('email');
      expect(response.body.user).to.have.a.property('role');
      expect(response.body.user).to.have.a.property('_id');
    });

    it('a propriedade role tem o valor de "admin', () => {
      expect(response.body.user.role).to.be.equal('admin');
    });
    
  })
});