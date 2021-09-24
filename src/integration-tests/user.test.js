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
      expect(response.body.user).to.have.property("name");
      expect(response.body.user).to.have.property("email");
      expect(response.body.user).to.have.property("role");
      expect(response.body.user).to.have.property("_id");
    });

    it('expect name to be the same in the signup and the role to be "user"', () => {
      expect(response.body.user.name).to.be.equal("testingboy");
      expect(response.body.user.role).to.be.equal("user");
    });
  });

  describe("when it is a invalid signup name or email or password", () => {
    let response = {};

    before(async () => {
      response = await chai.request(app).post("/users").send({
        name: "testingboy",
        password: "bigtest",
      });
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
    });

    it("return status code 400", () => {
      expect(response).to.have.status(400);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });
  });
});

describe("POST /users/admin", () => {
  let app;
  before(async () => {
    app = await server(MockedMongo);
  });

  describe("when it is a admin trying to add another admin", () => {
    let response = {};

    before(async () => {
      await MockedMongo.db.collection("users").insertOne({
        name: "admin",
        email: "root@email.com",
        password: "admin",
        role: "admin",
      });

      const res = await chai.request(app).post("/login").send({
        email: "root@email.com",
        password: "admin",
      });
      const token = res.body.token;

      response = await chai.request(app).post("/users/admin").set("authorization", token).send({
        name: "superadmin",
        email: "admin@test.com",
        password: "bigadmin",
      });
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
    });

    it("return status code 201", () => {
      expect(response).to.have.status(201);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });

    it('the object has property "user" "name", "email", "role", "_id"', () => {
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property("name");
      expect(response.body.user).to.have.property("email");
      expect(response.body.user).to.have.property("role");
      expect(response.body.user).to.have.property("_id");
    });

    it('expect name to be the same in the signup and the role to be "user"', () => {
      expect(response.body.user.name).to.be.equal("superadmin");
      expect(response.body.user.role).to.be.equal("admin");
    });
  });

  describe("when its not a admin", () => {
    let response = {};

    before(async () => {
      await MockedMongo.db.collection("users").insertOne({
        name: "test",
        email: "test@email.com",
        password: "test",
        role: "user",
      });

      const res = await chai.request(app).post("/login").send({
        email: "test@email.com",
        password: "test",
      });

      const token = res.body.token;

      response = await chai.request(app).post("/users/admin").set("authorization", token).send({
        name: "superadmin",
        email: "admin@test.com",
        password: "bigadmin",
      });
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
    });

    it("return status code 403", () => {
      expect(response).to.have.status(403);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });
  });
});
