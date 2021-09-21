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


        emptyRecipes = await chai.request(server).get('/recipes')
        
        
        
        const user = { "name" : "Erick Jacquin", "email" : "erickjacquin@gmail.com", "password" : "12345678", "role" : "user" }
        
        newUser = await chai.request(server).post('/users').send(user);


        
        const login = {"email" : "erickjacquin@gmail.com", "password" : "12345678"}
      
       token = await chai.request(server).post('/login').send(login)


        
        const recipe = { "name" : "Receita do Jacquin", "ingredients" : "Frango", "preparation" : "10 minutos no forno" }

       newRecipe = await chai.request(server).post('/recipes').set('authorization', token.body.token).send(recipe)

       const { _id } = newRecipe.body.recipe;

       findRecipe = await chai.request(server).get(`/recipes/${_id}`)

        const modifyRecipe = { "name" : "Receita do Jacquin", "ingredients" : "Picanha", "preparation" : "50 minutos no forno" }

        modifiedRecipe = await chai.request(server).put(`/recipes/${_id}`).set('authorization', token.body.token).send(modifyRecipe);

    })
    
    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    })
    
    // empty recipes
    it('returns status 200', async () => {
        expect(emptyRecipes).to.have.status(200)
    })

    it('returns an empty array', async () => {
        expect(emptyRecipes.body).to.be.a('array')
        expect(emptyRecipes.body.length).to.equal(0)
    })

    // create new user
    it('returns status 201', async () => {
        expect(newUser).to.have.status(201)
    })

    it('returns an object', async () => {
        expect(newUser).to.be.a('object')
        expect(newUser.body.user).to.have.any.keys('name', 'email', 'role', '_id')
    })

    // login
    it('when login is successful, returns token', async () => {
        expect(token).to.have.status(200)
        expect(token.body.token).to.be.a('string')
    })

    // post new recipe
    it('creates new recipe on db', async () => {
        expect(newRecipe).to.have.status(201)
        expect(newRecipe.body.recipe).to.have.all.keys('name', 'ingredients', 'preparation', 'userId', '_id')
    })

    //find recipe
    it('finds the correct recipe', async () => {
        expect(findRecipe).to.have.status(200);
        expect(findRecipe.body).to.have.all.keys('_id', 'name', 'ingredients', 'preparation', 'userId')
    })

    //modify recipe
    it('modifies recipe', async () => {
        expect(modifiedRecipe).to.have.status(200)
        expect(modifiedRecipe.body).to.be.a('object')
        expect(modifiedRecipe.body).to.have.all.keys('_id', 'name', 'ingredients', 'preparation', 'userId')
    })

});



describe('failed requests', () => {

    const DBServer = new MongoMemoryServer();

    before( async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock, {useNewUrlParser: true, useUnifiedTopology: true})
        sinon.stub(MongoClient, 'connect').resolves(connectionMock)

        notFound = await chai.request(server).get('/dawdada2e2d1')

        invalidEntries = await chai.request(server).post('/users').send({})

        emptyField = await chai.request(server).post('/login').send({});
    })

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    })

    it('request not found', async () => {
        expect(notFound).to.have.status(404)
    })

    it('invalid entries when register user', async () => {
        expect(invalidEntries).to.have.status(400)
        expect(invalidEntries.body).to.have.all.keys('message')
    })

    it('failed login - All fields must be filled', async () => {
        expect(emptyField).to.have.status(401);
        expect(emptyField.body).to.have.all.keys('message')
        expect(emptyField.body.message).to.equal('All fields must be filled')
    })

})