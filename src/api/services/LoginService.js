const Unauthorized = require('../middlewares/error/BaseError');
const { messages, statusCode } = require('../schemas');

class LoginService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate({ email, password }) {
    const user = await this.model.findBy({ email });
    if (!user || email !== user.email || password !== user.password) { 
      throw new Unauthorized(messages.INCORRECT_CREDENTIALS, statusCode.UNAUTHORIZED); 
    }

    const { _id, email: dbEmail, role } = user;
    const payload = {
      _id,
      email: dbEmail,
      role,
    };
    const token = this.authService.sign(payload);

    return token;
  }
}

module.exports = LoginService;