const MongoClient = require('mongodb/lib/mongo_client');
const sinon = require('sinon')
const chai = require('chai');

const { getConnection } = require('./connectionMock');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app')
// EXEMPLO DE CONECÇÃO BANCO

// let connectionMock;
// before(async () => {
//   connectionMock = await getConnection();
//   sinon.stub(MongoClient, 'connect').resolves(connectionMock);
// });

// after(() => {
//   MongoClient.connect.restore();
// })

// REQUEST 

// let response; 

// before(async () => {
//   response = await chai.request(app)
//     .post('/users')
//     .send({})
// })

// expect(response.body)...

//GET TOKEN 

// let respons;
// before(async() => {
//   const token = await chai.request(app).post('/login').send({user}).then((response) => response.token)

// response = await chai.request(app).get('/login').set('authorization', token)
// })

describe('POST /recipes', () => { });
describe('GET /recipes', () => { });
describe('GET /recipes/:id', () => { });
describe('PUT /recipes/:id', () => { });
describe('DELETE /recipes/:id', () => { });
describe('PUT /recipes/:id/image', () => { });