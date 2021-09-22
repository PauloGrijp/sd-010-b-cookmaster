const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/server');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa endpoint para cadastro de receitas', () => {
  describe('quando é cadastrado com sucesso', () => {

  });
});