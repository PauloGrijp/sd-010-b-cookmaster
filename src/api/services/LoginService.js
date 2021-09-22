const jwt = require('jsonwebtoken');
const Unauthorized = require('../middlewares/error/BaseError');
const { messages, statusCode } = require('../schemas');

class LoginService {
  constructor(model) {
    this.jwt = jwt;
    this.secret = 'superSecretPassword';
    this.model = model;
    this.messages = messages;
    this.statusCode = statusCode;
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate({ email, password }) {
    const user = await this.model.findBy({ email });
    if (!user || email !== user.email || password !== user.password) { 
      throw new Unauthorized(this.messages.INCORRECT_CREDENTIALS, this.statusCode.UNAUTHORIZED); 
    }

    const { _id, email: dbEmail, role } = user;
    const jwtconfig = {
      expiresIn: '2h',
      algorithm: 'HS256',
    };
    const payload = {
      _id,
      email: dbEmail,
      role,
    };
    
    const token = this.jwt.sign(payload, this.secret, jwtconfig);

    return token;
  }
}

module.exports = LoginService;