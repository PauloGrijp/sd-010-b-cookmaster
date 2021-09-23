const { statusCode, messages } = require('../schemas');

class RecipeController {
  constructor(service) {
    this.service = service;

    this.insertData = this.insertData.bind(this);
    this.getAll = this.getAll.bind(this);
    this.findById = this.findById.bind(this);
    this.updateData = this.updateData.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(_req, res, next) {
    try {
      const result = await this.service.getAll();
      res.status(statusCode.OK).json(result);
    } catch (e) {
      e.message = messages.DB_FAILURE;
      e.statusCode = statusCode.UNKNOWN;
      next(e);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.service.findById(id);
      res.status(statusCode.OK).json(result);
    } catch (e) {
      next(e);
    }
  }

  async insertData(req, res) {
    const recipe = req.body;
    const token = req.headers.authorization;

    const result = await this.service.insert({ recipe, token });
    res.status(statusCode.CREATED).json({ recipe: result });
  }

  async updateData(req, res, next) {
    try {
      const recipe = req.body;
      const { id } = req.params;
      const token = req.headers.authorization;
      const result = await this.service.update({ id, recipe, token });
      res.status(statusCode.OK).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }
}

module.exports = RecipeController;