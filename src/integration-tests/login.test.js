const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../api/configs/customExpress");
const MockedMongo = require("./MockedMongo");

chai.use(chaiHttp);

const { expect } = chai;

describe("POST /login", () => {
  let app;
  before(async () => {
    app = await server(MockedMongo);
  });

  describe("when it is not registered in db", () => {
    let response = {};

    before(async () => {
      response = await chai.request(app).post("/login").send({
        email: "test@test.com",
        password: "test",
      });
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
    });

    it("return status code 401", () => {
      expect(response).to.have.status(401);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });

    it('the object has property "message"', () => {
      expect(response.body).to.have.property("message");
    });

    it('message property has the following text: "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal("Incorrect username or password");
    });
  });

  describe("when it is registered in db", () => {
    let response = {};

    before(async () => {
      const validData = {
        email: "valid@valid.com",
        password: "valid",
      };
      await MockedMongo.db.collection("users").insertOne(validData);
      response = await chai.request(app).post("/login").send(validData);
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
    });

    it("return status code 200", () => {
      expect(response).to.have.status(200);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });

    it('the object has property "token"', () => {
      expect(response.body).to.have.property("token");
    });
  });
});
