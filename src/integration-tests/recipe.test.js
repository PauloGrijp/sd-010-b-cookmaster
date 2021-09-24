const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../api/configs/customExpress");
const MockedMongo = require("./MockedMongo");

chai.use(chaiHttp);

const { expect } = chai;

describe("POST /recipe", () => {
  let app;
  let token;
  const validRecipe = {
    name: "chicken",
    ingredients: "chiken",
    preparation: "oven",
  };

  before(async () => {
    app = await server(MockedMongo);
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

    token = res.body.token;
    response = await chai.request(app).post("/users").send({
      name: "testingboy",
      email: "testing@test.com",
      password: "bigtest",
    });
  });

  describe("when it is a valid recipe and authenticated user", () => {
    let response = {};

    before(async () => {
      response = await chai
        .request(app)
        .post("/recipes")
        .set("authorization", token)
        .send(validRecipe);
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
      await MockedMongo.db.collection("recipes").deleteMany({});
    });

    it("return status code 201", () => {
      expect(response).to.have.status(201);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });

    it('the object has property "recipe" "name", "ingredients", "preparation", "_id", "userId"', () => {
      expect(response.body).to.have.property("recipe");
      expect(response.body.recipe).to.have.property("name");
      expect(response.body.recipe).to.have.property("ingredients");
      expect(response.body.recipe).to.have.property("preparation");
      expect(response.body.recipe).to.have.property("_id");
      expect(response.body.recipe).to.have.property("userId");
    });

    it("expect name to be the same in of the inserted recipe", () => {
      expect(response.body.recipe.name).to.be.equal(validRecipe.name);
    });
  });
});

describe("GET /recipe", () => {
  let app;
  const validRecipe1 = {
    name: "chicken",
    ingredients: "chiken",
    preparation: "oven",
  };

  const validRecipe2 = {
    name: "chicken",
    ingredients: "chiken",
    preparation: "oven",
  };

  before(async () => {
    app = await server(MockedMongo);
    await MockedMongo.db.collection("recipes").insertMany([validRecipe1, validRecipe2]);
  });

  describe("should be able to get all recipes in the database", () => {
    let response = {};

    before(async () => {
      response = await chai.request(app).get("/recipes");
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
      await MockedMongo.db.collection("recipes").deleteMany({});
    });

    it("return status code 201", () => {
      expect(response).to.have.status(200);
    });

    it("returns a array", () => {
      expect(response.body).to.be.a("array");
    });

    it("should return all recipes", () => {
      expect(response.body.length).to.equal(2);
    });
  });
});

describe("POST /recipe/:id", () => {
  let app;
  let token;
  let id;
  const validRecipe = {
    name: "chicken",
    ingredients: "chiken",
    preparation: "oven",
  };
  const validRecipe2 = {
    name: "chicken",
    ingredients: "chiken",
    preparation: "oven",
  };

  before(async () => {
    app = await server(MockedMongo);
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
    token = res.body.token;
    response = await chai.request(app).post("/users").send({
      name: "testingboy",
      email: "testing@test.com",
      password: "bigtest",
    });
  });

  describe("when it is a recipe that is in the db", () => {
    let response = {};

    before(async () => {
      const {
        body: {
          recipe: { _id },
        },
      } = await chai.request(app).post("/recipes").set("authorization", token).send(validRecipe2);
      id = _id;
      await chai.request(app).post("/recipes").set("authorization", token).send(validRecipe);
      response = await chai.request(app).get(`/recipes/${id}`);
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
      await MockedMongo.db.collection("recipes").deleteMany({});
    });

    it("return status code 200", () => {
      expect(response).to.have.status(200);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });

    it('the object has property "recipe" "name", "ingredients", "preparation", "_id", "userId"', () => {
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("ingredients");
      expect(response.body).to.have.property("preparation");
      expect(response.body).to.have.property("_id");
      expect(response.body).to.have.property("userId");
    });

    it('expect name to be the same of the searched recipe"', () => {
      expect(response.body.name).to.be.equal(validRecipe.name);
    });
  });
});

describe("PUT /recipe/:id", () => {
  let app;
  let token;
  let id;
  const validRecipe = {
    name: "chicken",
    ingredients: "chiken",
    preparation: "oven",
  };
  const validRecipe2 = {
    name: "teste",
    ingredients: "teste",
    preparation: "teste",
  };

  before(async () => {
    app = await server(MockedMongo);
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
    token = res.body.token;
    response = await chai.request(app).post("/users").send({
      name: "testingboy",
      email: "testing@test.com",
      password: "bigtest",
    });
  });

  describe("when it is a recipe that is in the db and can be updated", () => {
    let response = {};

    before(async () => {
      const {
        body: {
          recipe: { _id },
        },
      } = await chai.request(app).post("/recipes").set("authorization", token).send(validRecipe);
      id = _id;
      response = await chai
        .request(app)
        .put("/recipes/" + id)
        .set("authorization", token)
        .send(validRecipe2);
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
      await MockedMongo.db.collection("recipes").deleteMany({});
    });

    it("return status code 200", () => {
      expect(response).to.have.status(200);
    });

    it("returns a object", () => {
      expect(response.body).to.be.a("object");
    });

    it('the object has property "recipe" "name", "ingredients", "preparation", "_id", "userId"', () => {
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("ingredients");
      expect(response.body).to.have.property("preparation");
      expect(response.body).to.have.property("_id");
      expect(response.body).to.have.property("userId");
    });

    it('expect name to be the same of the searched recipe"', () => {
      expect(response.body.name).to.be.equal(validRecipe2.name);
    });
  });
});

describe("DELETE /recipe/:id", () => {
  let app;
  let token;
  let id;
  const validRecipe = {
    name: "chicken",
    ingredients: "chiken",
    preparation: "oven",
  };

  before(async () => {
    app = await server(MockedMongo);
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
    token = res.body.token;
    response = await chai.request(app).post("/users").send({
      name: "testingboy",
      email: "testing@test.com",
      password: "bigtest",
    });
  });

  describe("when it is a recipe that is in the db and can be deleted", () => {
    let response = {};

    before(async () => {
      const {
        body: {
          recipe: { _id },
        },
      } = await chai.request(app).post("/recipes").set("authorization", token).send(validRecipe);
      id = _id;
      response = await chai
        .request(app)
        .delete("/recipes/" + id)
        .set("authorization", token);
    });

    after(async () => {
      await MockedMongo.db.collection("users").deleteMany({});
      await MockedMongo.db.collection("recipes").deleteMany({});
    });

    it("return status code 204", () => {
      expect(response).to.have.status(204);
    });

    it("returns a object", () => {
      expect(response.body).to.be.empty;
    });
  });
});
