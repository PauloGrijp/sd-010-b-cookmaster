class RecipeService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;

    this.insert = this.insert.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async getAll() {
    const recipeList = await this.model.getAll();
    return recipeList;
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