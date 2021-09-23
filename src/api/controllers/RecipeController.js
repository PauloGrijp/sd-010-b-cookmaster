const { statusCode } = require('../schemas');

class RecipeController {
  constructor(service) {
    this.service = service;

    this.insertData = this.insertData.bind(this);
  }

  async insertData(req, res, _next) {
    const recipe = req.body;
    const token = req.headers.authorization;

    const result = await this.service.insert({ recipe, token });
    res.status(statusCode.CREATED).json({ recipe: result });
  }
}

module.exports = RecipeController;