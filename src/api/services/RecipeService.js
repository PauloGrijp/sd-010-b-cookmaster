const NotFound = require('../middlewares/error/BaseError');
const { statusCode, messages } = require('../schemas');

class RecipeService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;

    this.insert = this.insert.bind(this);
    this.getAll = this.getAll.bind(this);
    this.findById = this.findById.bind(this);
  }

  async getAll() {
    const recipeList = await this.model.getAll();
    return recipeList;
  }

  async findById(id) {
    const result = await this.model.findBy({ _id: id });
    if (!result) throw new NotFound(messages.RECIPE_NOT_FOUND, statusCode.NOT_FOUND);
    return result;
  }

  async insert({ recipe, token }) {
    const payload = this.authService.authenticate(token);
    const { _id } = payload;

    const res = await this.model.insert(recipe);
    res.userId = _id;
    return res;
  }
}

module.exports = RecipeService;