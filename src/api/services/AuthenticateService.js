const jwt = require('jsonwebtoken');

const secret = 'mysupersecret';

class AuthenticateService {
  static sign(payload) {
    const jwtconfig = {
      expiresIn: '2h',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, secret, jwtconfig);

    return token;
  }

  static authenticate(token) {
    const payload = jwt.verify(token, secret);
    return payload;
  }
}

module.exports = AuthenticateService;