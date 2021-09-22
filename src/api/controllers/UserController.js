const { statusCode } = require('../schemas');

class UserController {
  constructor(service) {
    this.service = service;
    this.statusCode = statusCode;
    this.insertData = this.insertData.bind(this);
  }

  async insertData(req, res, next) {
    try {
      const data = req.body;
      const result = await this.service.insert(data);
      return res.status(this.statusCode.CREATED).json({ user: result });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;