const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = chai;
chai.use(chaiHttp);

describe('Testa rota GET /recipes', () => {
  const newRecipes = [
    {
      name: 'arroz',
      ingredients: 'arroz, água e tompero',
      preparation: 'torrar o arroz, colocar tompero, colocar água até tampar o arroz e cozinhar',
    },
    {
      name: 'macarrão',
      ingredients: 'macarrão, água e sal',
      preparation: 'cozinhar o macarrão na água com sal',
    },
  ];

	describe('Testa listRecipes', () => {
    let response;
    const DBServer = new MongoMemoryServer();

		let connectionMock;

    before(async () => {
      const URLMock = await DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertMany(newRecipes);
      response = await chai.request(server).get('/recipes');
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
			MongoClient.connect.restore();
    });
        
		it('retorna código status "200"', () => {
      expect(response).to.have.status(200);
    })

    it('retorna um array', () => {
      expect(response.body).to.be.an('array');
    })

  	it('tem duas receitas', () => {
      expect(response.body.length).to.be.equal(2);
    });

    it('as receitas possuem as seguintes chaves', () => {
      expect(response.body[0]).to.have.keys('_id', 'name', 'ingredients', 'preparation');
      expect(response.body[1]).to.have.keys('_id', 'name', 'ingredients', 'preparation');
    });
	});

  describe('Testa getRecipeById', () => {
		const newRecipe = [
			{
				name: 'beijinho',
				ingredients: 'leite em pó, leite condensado, açúcar e cravo',
				preparation: 'misture o leite em pós com o leite condensado e faça bolinhas. passe no açúcar e coloque um cravo por cima',
			},
		];
	
    let response;
		const DBServer = new MongoMemoryServer();

		let connectionMock;

		before(async () => {
      const URLMock = await DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
			
			await connectionMock.db('Cookmaster').collection('recipes').insertOne({ newRecipe });
			recipes = await chai.request(server).get('/recipes');
      response = await chai.request(server).get(`/recipes/${recipes.body[0]._id}`);
		});

		after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
			MongoClient.connect.restore();
    });

    it('retorna código status "200"', () => {
      expect(response).to.have.status(200);
    })

    it('retorna um objeto', () => {
    	expect(response.body).to.be.an('object')
    })

    it('o retorno possui os seguintes campos', () => {
      expect(response.body).to.have.keys('_id', 'newRecipe');
    });		
  });	
})