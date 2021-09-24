const chai = require("chai");
const chaiHttp = require("chai-http");
const Mongo = require("../api/utils/database/Mongo");
const sinon = require("sinon");
const connect = require("mongodb");

chai.use(chaiHttp);

const { expect } = chai;

describe("Test Mongo", () => {
  it("start mongo", async () => {
    sinon.stub(Mongo, "main").resolves({ db: 1 });
    await Mongo.main();
    const db = await Mongo.db;
    expect(db).to.not.null;
  });
});
