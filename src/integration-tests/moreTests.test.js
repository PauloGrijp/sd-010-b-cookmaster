const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/server');

const { expect } = chai;

chai.use(chaiHttp);

describe('successful requests', () => {

    const DBServer = new MongoMemoryServer();

    before( async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock, {useNewUrlParser: true, useUnifiedTopology: true})
        sinon.stub(MongoClient, 'connect').resolves(connectionMock)

        await connectionMock.db('Cookmaster').collection('users').insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });


        const seedAdmin = {email: 'root@email.com', password: 'admin'};

        const newAdmin = { "name" : "admin2", "email" : "admin2@gmail.com", "password" : "12345678", "role" : "admin" }

        // adminLogin = await chai.request(server).post('/login').send(seedAdmin)

        registerNewAdmin = await chai.request(server).post('/users/admin').send(newAdmin)

    })

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    })

    // it('seedAdmin login successful', async () => {
    //     expect(adminLogin).to.have.status(200)
    // })


    it('register new admin fail', async () => {
        expect(registerNewAdmin).to.have.status(401)
        expect(registerNewAdmin.body.message).to.equal("missing auth token")
    })
})