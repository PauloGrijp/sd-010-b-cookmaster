const { statusCode, messages } = require('../schemas');

class RecipeController {
  constructor(service) {
    this.service = service;

    this.insertData = this.insertData.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req, res, next) {
    try {
      const result = await this.service.getAll();
      res.status(statusCode.OK).json(result);
    } catch (e) {
      console.log(e);
      e.message = messages.DB_FAILURE;
      e.statusCode = statusCode.UNKNOWN;
      next(e);
    }
  }

  async insertData(req, res) {
    const recipe = req.body;
    const token = req.headers.authorization;

    const result = await this.service.insert({ recipe, token });
    res.status(statusCode.CREATED).json({ recipe: result });
  }
}

module.exports = RecipeController;