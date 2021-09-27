const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const server = require('../api/app');
const connectMock = require('./connectMock');
const usersService = require('../services/usersService');

chai.use(chaiHttp);

describe('POST /users', () => {
  // ...
});
