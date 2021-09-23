const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const server = require('../api/app');

chai.use(chaiHttp);


describe('POST/users', () => {
  let reponse;
  before( async () => {
    response = await chai.request(server).post('/users').send({
      name: "Erick Jacquin",
      email: "erickjaquinO@gmail.com",
      password: "12345678",
    });
  })
  describe('Testa a criação com sucesso de um novo usuário', () => {
    it('testa se resposta vem com o status correto', () => 
    expect(response));
    it('testa se resposta vem como um objeto');
    it('testa se resposta contem as propriedades desejadas');
    it('testa se a resposta cotém o resultado desejado')
  })
});
