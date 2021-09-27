const { MongoClient } = require("mongodb");
const chai = require("chai");
const sinon = require("sinon");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../api/app");
const { mockConnection } = require("./connectionMock");

const { expect } = chai;

describe('POST /recipes', () => {
  describe('quando name, ingredients e preparation não são informados', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post("/recipes").send({});
    });

    it('retorna status HTTP 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response).to.have.a.property('message');
    });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response).to.be.equal('Invalid entries. Try again.')
    });
  });

  describe('que não é possível cadastrar uma receita com token inválido', () => {
    let response;

    before(async () => {
      response = await chai
        .request(app)
        .post("/login")
        .send({ 
          name: "fake-name",
          ingredients: "fake-ing",
          preparation: "fake-prep"
        })
        .set('authorization', 'fake-token');
    });

    it('retorna status HTTP 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('a propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('jwl malformed');
    });

  })
})