const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;
const { MongoClient } = require('mongodb');
const { getConnection } = require('mongodb-memory-server')
const server = require('./api/app');

describe('GET /api/posts', () => {

    let connectionMock;

    before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    })

    after(() => {
        MongoClient.connect.restore();
    })

    describe('Quando não é passado um JWT para autenticação', () => {
        let response;
        before(async () => {
            response = await chai.request(server).get('/api/posts').set('authorization', '');
        })

        it('retornar código status "401"', () => {
            expect(response).to.have.status(401);
        })

        it('retorna um objeto no body', () => {
            expect(response.body).to.be.an('object');
        })

        it('objeto de resposta possui a propriedade "error"', () => {
            expect(response.body).to.have.property('error');
        });

        it('a propriedade "error" possui a mensagem "Token não encontrado ou informado"', () => {
            expect(response.body.error).to.be.equal('Token não encontrado ou informado');
        });

    });

    describe('Quando os posts são buscados com sucesso', () => {

        let response;

        before(async () => {
            //TODO: Cadastrar no banco de dados um user
            const userCollection = connectionMock.db('jwt_exercise').collection('users')
            await userCollection.insertOne({
                username: 'user-logado',
                password: 'senha-logado'
            })

            //TODO: Fazer login
            const authResponse = await chai.request(server).post('/api/login').send({
                username: 'user-logado',
                password: 'senha-logado'
            })

            const token = authResponse.body.message;

            //TODO: Fazer a request com o token
            response = await chai.request(server).get('/api/posts').set('authorization', token)

        });

        it('retorna código status "200"', () => {
            expect(response).to.have.status(200);
        })

        it('retorna um objeto', () => {
            expect(response.body).to.be.an('object')

        })

        it('a propriedade "mockPosts" é um array', () => {
            expect(response.body.mockPosts).to.be.an('array')
        })
    });

})