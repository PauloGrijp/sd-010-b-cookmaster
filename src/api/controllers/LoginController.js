const { statusCode } = require('../schemas');

class LoginController {
  constructor(service) {
    this.service = service;
    this.statusCode = statusCode;
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.service.authenticate({ email, password });
      return res.status(this.statusCode.OK).json({ token: result });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = LoginController;