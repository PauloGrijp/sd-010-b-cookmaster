const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/server');

const { expect } = chai;
chai.use(chaiHttp);


describe('Testa erros internos da aplicação', () => {
  describe('quando ocorre um erro', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get('/error_test').send({ telefone: 123 })
    });

    it('retorna o status 500', () => {
      expect(response).to.have.status(500);
    });

    it('retorna um objeto com a chave "message"', () => {
      expect(response.body).to.be.an('object');
    });

    it('"message" possui o valor "Internal error test"', () => {
      expect(response.body.message).to.be.equal('Internal error test')
    });
  });
});