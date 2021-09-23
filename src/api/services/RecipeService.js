class RecipeService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;

    this.insert = this.insert.bind(this);
  }

  async insert({ recipe, token }) {
    const payload = this.authService.authenticate(token);
    const { _id } = payload;

    const res = await this.model.insert(recipe);
    console.log(res, _id);
    res.userId = _id;
    return res;
  }
}

module.exports = RecipeService;