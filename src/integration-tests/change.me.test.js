// describe('', () => {
// });
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const server = require('../api/app');

const {user, recipe, anotherRecipe, admin, newAdmin} = require('./mockData')
