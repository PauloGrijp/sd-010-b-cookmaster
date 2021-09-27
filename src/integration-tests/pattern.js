const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { MongoClient }  = require('mongodb');
const getConnection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);

describe('POST/users', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });
});