class UserService {
  constructor(model) {
    this.model = model;
    // methods
    this.insert = this.insert.bind(this);
  }

  async insert(data) {
    const values = data;
    values.role = 'user';
    const res = await this.model.insert(values);
    return res;
  }
}

module.exports = UserService;