const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

chai.use(chaiHttp);
const {expect} = chai

describe("Tests if an user can be created", () => {
  describe("using invalid data", () => {
    let response = {};
    const DBServer = new MongoMemoryServer();
    const INVALID_ENTRIES = "Invalid entries. Try again.";
    const BAD_REQUEST = 400;
    const CONFLICT = 409;
    
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

    it("invalid name", async () => {
      response = await chai.request(server).post("/users").send({
        name: "",
        email: "user@email.com",
        password: "123456",
      });

      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("invalid email;", async () => {
      response = await chai.request(server).post("/users").send({
        name: "User",
        email: "",
        password: "123456",
      });

      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("invalid email template;", async () => {
      response = await chai.request(server).post("/users").send({
        name: "User",
        email: "User",
        password: "123456",
      });

      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("without password;", async () => {
      response = await chai.request(server).post("/users").send({
        name: "User",
        email: "user@email.com",
        password: "",
      });

      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.have.property("message", INVALID_ENTRIES);
    });

    it("existing email;", async () => {

      await chai.request(server).post("/users").send({
        name: "User",
        email: "user@email.com",
        password: "123456",
      });

      response = await chai.request(server).post("/users").send({
        name: "User",
        email: "user@email.com",
        password: "123456",
      });

      expect(response).to.have.status(CONFLICT);
      expect(response.body).to.have.property("message", "Email already registered");
    });
  });

  describe("usign valid data", () => {
    let response = {};
    const DBServer = new MongoMemoryServer();
    const CREATED = 201;
    const SEND_USER = {
      name: "User",
      email: "user@email.com",
      password: "123456",
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

    it("Successfully created", () => {
      expect(response).to.have.status(CREATED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property('name', "User",);
      expect(response.body.user).to.have.property('email', "user@email.com");
      expect(response.body.user).to.have.property('role', "user");
    });
  });
});