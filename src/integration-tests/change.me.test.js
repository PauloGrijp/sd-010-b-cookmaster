const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Requisito 11, verifica o endpoint "/users"', () => {
    let response = {};
     const DBServer = new MongoMemoryServer();

    before(async () => {
         const URLMock = await DBServer.getUri();
         const connectionMock = await MongoClient.connect(URLMock,
             { useNewUrlParser: true, useUnifiedTopology: true }
         );

         sinon.stub(MongoClient, 'connect')
             .resolves(connectionMock);
    });

     after(async () => {
         MongoClient.connect.restore();
         await DBServer.stop();
     });



   describe('quando é criado com sucesso', () => {
        before(async () => {
            response = await chai.request(server)
                .post('/users')
                .send({
                    name: 'Janaina',
                    email: 'Jana@gmail.com',
                    password: 'senha123'
                });
        });

       it('retorna o código de status 201', () => {
           expect(response).to.have.status(201);
       });

       it('retorna um objeto', () => {
           expect(response.body).to.be.a('object');
       });

       it('o objeto possui a propriedade "name"', () => {
           expect(response.body.user).to.have.property('name');
       });

       it('o objeto possui a propriedade "email"', () => {
        expect(response.body.user).to.have.property('email');
       });

       it('o objeto possui a propriedade "role"', () => {
          expect(response.body.user).to.have.property('role');
       });

       it('o objeto possui a propriedade "_id"', () => {
        expect(response.body.user).to.have.property('_id');
      });

       it('a propriedade "name" possui o texto "Janaina"',
             () => {expect(response.body.user.name).to.be.equal('Janaina')}
       );
   });


   describe('Quando não são passados os campos "name", "email", "password" no endpoint "/users"', () => {

    before(async () => {
        response = await chai.request(server)
            .post('/users')
            .send({
                name: '',
                email: '',
                password: ''
            });
    });

    it('Retorna o código de status 400', () => {
        expect(response).to.have.status(400)
    })

    it('Retorna um objeto', () => {
        expect(response).to.be.a('object');
    })

    it('Verifica se não existe a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    })

    it('Verifica se não existe a propriedade "message"', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })

})


   describe('verifica o endpoint "/login", em caso de não receber email ou password', () => {

        before(async () => {
            response = await chai.request(server)
                .post('/login')
                .send({
                    email: '',
                    password: ''
                });
        });

        it('Retorna o status 401',() => {
            expect(response).to.have.status(401);
        })

        it('Retorna um objeto',() => {
            expect(response).to.be.a('object');
        })

        it('Verifica se retorna propriedade "message" quando não passado email válido',() => {
            expect(response.body).to.have.property('message')
        })

        it('Verifica mensagem de retorno da propriedade "message" quando não passado email válido',() => {
            expect(response.body.message).to.be.equal('All fields must be filled')
        })
        
        it('Verifica se retorna propriedade "message" quando não passado password válido',() => {
            expect(response.body).to.have.property('message')
        })

        it('Verifica mensagem de retorno da propriedade "message" quando não passado password válido',() => {
            expect(response.body.message).to.be.equal('All fields must be filled')
        })
   })


   describe('verifica o endpoint "/login", em caso de sucesso', () => {

    before(async () => {

        

        response = await chai.request(server)
            .post('/login')
            .send({
                email: 'Lucas',
                password: 'lucas@gmail.com'
            });
    });

    it('Retorna o status 200',() => {
        expect(response).to.have.status(200);
    })

    it('Retorna um objeto',() => {
        expect(response).to.be.a('object');
    })

    it('Verifica se retorna Token',() => {
        expect(response.body).to.have.property('token');
    })
    

    // it('V',() => {
    //     expect(response.body.message).to.be.equal('All fields must be filled')
    // })
})
});