const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient, ObjectId } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

const server = require("../../api/app.js");

chai.use(chaiHttp);

const { expect } = chai;

describe("1 - Criando usuário:", () => {
  describe("a - Dados inválidos", () => {
    let response = {};
    const DBServer = new MongoMemoryServer();
    const INVALID_ENTRIES = "Invalid entries. Try again.";

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, "connect").resolves(connectionMock);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it("sem nome;", async () => {
      response = await chai.request(server).post("/users").send({
        name: "",
        email: "erickjaquin@gmail.com",
        password: "12345678",
      });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("sem email;", async () => {
      response = await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "",
        password: "12345678",
      });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("com email inválido;", async () => {
      response = await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "erickjaquin",
        password: "12345678",
      });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("sem senha;", async () => {
      response = await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "",
      });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("email já existe;", async () => {

      await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "123456",
      });

      response = await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "123456",
      });

      expect(response).to.have.status(409);
      expect(response.body).to.have.property("message", "Email already registered");
    });
  });

  describe("b - Dados válidos", () => {
    let response = {};
    const DBServer = new MongoMemoryServer();
    const SEND_USER = {
      name: "Erick Jacquin",
      email: "erickjaquin@gmail.com",
      password: "12345678",
    };

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, "connect").resolves(connectionMock);

      response = await chai.request(server).post("/users").send(SEND_USER);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it("Criado com sucesso;", () => {
      expect(response).to.have.status(201);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property('name', "Erick Jacquin",);
      expect(response.body.user).to.have.property('email', "erickjaquin@gmail.com");
      expect(response.body.user).to.have.property('role', "user");
    });
  });
});
