const chai = require("chai");
const chaiHttp = require("chai-http");
const Mongo = require("../api/utils/database/Mongo");

chai.use(chaiHttp);

const { expect } = chai;

describe("Test Mongo", () => {
  it("start mongo", async () => {
    await Mongo.main();
    const db = await Mongo.db;
    expect(db).to.not.null;
  });
});
