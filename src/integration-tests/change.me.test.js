const chai = require("chai");
const chaiHttp = require('chai-http');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando o campo name está vazio', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({ email: 'email@email.com', password: "senha"})
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando o campo email está vazio', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'name', password: "senha"})
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando o campo email é inválido', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'name', email: 'email@email', password: "senha"})
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando o campo password está vazio', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'name', email: 'email@email' })
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});
