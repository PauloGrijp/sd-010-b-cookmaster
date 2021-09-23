const Unauthorized = require('../middlewares/error/BaseError');
const { messages, statusCode } = require('../schemas');

class UserService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;
    // methods
    this.insert = this.insert.bind(this);
    this.insertAdmin = this.insertAdmin.bind(this);
    this.checkIfUserIsAuthorized = this.checkIfUserIsAuthorized.bind(this);
  }

  checkIfUserIsAuthorized(token) {
    const payload = this.authService.authenticate(token);
    const { role } = payload;
    if (role !== 'admin') {
      throw new Unauthorized(messages.NOT_ADMIN, statusCode.FORBIDDEN);
    } 
  }

  async insert(data) {
    const values = data;
    values.role = 'user';
    const res = await this.model.insert(values);
    return res;
  }

  async insertAdmin({ data, token }) {
    this.checkIfUserIsAuthorized(token);
    const values = data;
    values.role = 'admin';
    const res = await this.model.insert(values);
    return res;
  }
}

module.exports = UserService;