const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient, ObjectId } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

const server = require("../../api/app.js");

chai.use(chaiHttp);

const { expect } = chai;

describe("1 - lista todas as receitas", () => {
  const DBServer = new MongoMemoryServer();
  const INVALID_ENTRIES = "Invalid entries. Try again.";
  let token = "";

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

    token = await chai
      .request(server)
      .post("/login")
      .send({
        email: "erickjaquin@gmail.com",
        password: "123456",
      })
      .then(({ body }) => body.token);

    await chai
      .request(server)
      .post("/recipes")
      .set("authorization", token)
      .send({
        name: "Frango do jacquin",
        ingredients: "Frango",
        preparation: "10 min no forno",
      });

    await chai
      .request(server)
      .post("/recipes")
      .set("authorization", token)
      .send({
        name: "Frango do jacquin melhorado",
        ingredients: "Frango, requeijão",
        preparation: "11 min no forno",
      });
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  it("Verifica se retorna um array com 2 elementos;", async () => {
    response = await chai.request(server).get("/recipes");

    expect(response).to.have.status(200);
    expect(response.body).to.be.a("array").lengthOf(2);
  });
});
