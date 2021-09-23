const NotFound = require('../middlewares/error/BaseError');

const Unauthorized = NotFound;
const { statusCode, messages } = require('../schemas');

class RecipeService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;

    this.insert = this.insert.bind(this);
    this.getAll = this.getAll.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.checkIfUserIsAuthorized = this.checkIfUserIsAuthorized.bind(this);
    this.delete = this.delete.bind(this);
  }

  async checkIfUserIsAuthorized(id, token) {
    const payload = this.authService.authenticate(token);
    const result = await this.model.findBy({ _id: id });
    if (!result) throw new NotFound(messages.RECIPE_NOT_FOUND, statusCode.NOT_FOUND);
    
    const { _id, role } = payload;
    if (_id !== result.userId && role !== 'admin') {
      throw new Unauthorized(messages.INCORRECT_CREDENTIALS, statusCode.UNAUTHORIZED);
    } 
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
    const values = recipe;
    const { _id } = payload;
    values.userId = _id;

    const res = await this.model.insert(values);
    return res;
  }

  async update({ id, value, token }) {
    await this.checkIfUserIsAuthorized(id, token);

    await this.model.update({ id, value });
    const updateResult = await this.model.findBy({ _id: id });
    return updateResult;
  }

  async delete({ id, token }) {
    await this.checkIfUserIsAuthorized(id, token);
    await this.model.delete(id);
  }
}

module.exports = RecipeService;