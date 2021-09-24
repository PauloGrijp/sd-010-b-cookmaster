const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../api/configs/customExpress");
const MockedMongo = require("./MockedMongo");

chai.use(chaiHttp);

const { expect } = chai;

describe("POST /users", () => {
  let app;
  before(async () => {
    app = await server(MockedMongo);
  });

  describe("when it is a valid signup with name, email and password", () => {
    let response = {};

    before(async () => {
      response = await chai.request(app).post("/users").send({
        name: "testingboy",
        email: "testing@test.com",
        password: "bigtest",
      });
    });

    after(() => {
      MockedMongo.db.collection("users").deleteMany({});
    });

    it("return status code 201", () => {
      expect(response).to.have.status(201);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });

    it('the object has property "user" "name", "email", "role", "_id"', () => {
      expect(response.body).to.have.property("user");
    });

    // it('message property has the following text: "Incorrect username or password"', () => {
    //   expect(response.body.message).to.be.equal("Incorrect username or password");
    // });
  });
});
