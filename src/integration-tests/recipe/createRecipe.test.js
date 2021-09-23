const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient, ObjectId } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

const server = require("../../api/app.js");

chai.use(chaiHttp);

const { expect } = chai;

describe("1 - Criando receita:", () => {
  describe("a - Quando não é criado com sucesso", () => {
    let token = "";
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

      await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "123456",
      });
    });

    beforeEach(async () => {
      token = await chai
        .request(server)
        .post("/login")
        .send({
          email: "erickjaquin@gmail.com",
          password: "123456",
        })
        .then(({ body }) => body.token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it("sem nome;", async () => {
      response = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send({
          name: "",
          ingredients: "Frango",
          preparation: "10 min no forno",
        });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("sem ingredientes;", async () => {
      response = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send({
          name: "Frango do jacquin",
          ingredients: "",
          preparation: "10 min no forno",
        });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("sem preparação;", async () => {
      response = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send({
          name: "Frango do jacquin",
          ingredients: "Frango",
          preparation: "",
        });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });
  });

  describe("b - Quando é criado com sucesso:", () => {
    let token = "";
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

      await chai.request(server).post("/users").send({
        name: "Erick Jacquin",
        email: "erickjaquin@gmail.com",
        password: "123456",
      });
    });

    beforeEach(async () => {
      token = await chai
        .request(server)
        .post("/login")
        .send({
          email: "erickjaquin@gmail.com",
          password: "123456",
        })
        .then(({ body }) => body.token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it("Criado com sucesso;", async () => {
      response = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send({
          name: "Frango do jacquin",
          ingredients: "Frango",
          preparation: "10 min no forno",
        });

      expect(response).to.have.status(201);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("recipe");
      expect(response.body.recipe).to.have.property(
        "name",
        "Frango do jacquin"
      );
      expect(response.body.recipe).to.have.property("ingredients", "Frango");
      expect(response.body.recipe).to.have.property(
        "preparation",
        "10 min no forno"
      );
    });
  });
});
