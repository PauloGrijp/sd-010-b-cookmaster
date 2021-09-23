const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient, ObjectId } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

const server = require("../api/app.js");

chai.use(chaiHttp);

const { expect } = chai;

describe("2 - Logando usuário:", () => {
  describe("a - Quando não é possível logar", () => {
    let response = {};
    const DBServer = new MongoMemoryServer();
    const FIELDS_REQUIRED = "All fields must be filled";

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

    beforeEach(async () => {
      await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "12345678",
      });
    });

    it("sem email;", async () => {
      response = await chai.request(server).post("/login").send({
        email: "",
        password: "12345678",
      });

      expect(response).to.have.status(401);
      expect(response.body).to.have.property("message", FIELDS_REQUIRED);
    });

    it("com email inválido;", async () => {
      response = await chai.request(server).post("/login").send({
        email: "erickjaquin",
        password: "12345678",
      });

      expect(response).to.have.status(401);
      expect(response.body).to.have.property("message", FIELDS_REQUIRED);
    });

    it("sem senha;", async () => {
      response = await chai.request(server).post("/login").send({
        email: "erickjaquin@gmail.com",
        password: "",
      });

      expect(response).to.have.status(401);
      expect(response.body).to.have.property("message", FIELDS_REQUIRED);
    });

    it("usuário inválido;", async () => {
      response = await chai.request(server).post("/login").send({
        email: "erickjaquin@gmail.co",
        password: "123456",
      });

      expect(response).to.have.status(401);
      expect(response.body).to.have.property("message", "Incorrect username or password");
    });

    it("senha incorreta;", async () => {
      response = await chai.request(server).post("/login").send({
        email: "erickjaquin@gmail.com",
        password: "87654321",
      });

      expect(response).to.have.status(401);
      expect(response.body).to.have.property("message", "Incorrect username or password");
    });
  });

  describe("b - Quando é possível logar", () => {
    let response = {};
    const DBServer = new MongoMemoryServer();
    const FIELDS_REQUIRED = "All fields must be filled";

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

    beforeEach(async () => {
      await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "12345678",
      });
    });

    it("Verifica se retorna um token;", async () => {
      response = await chai.request(server).post("/login").send({
        email: "erickjaquin@gmail.com",
        password: "12345678",
      });

      expect(response).to.have.status(200);
      expect(response.body).to.have.property("token");
    });
  });
});
