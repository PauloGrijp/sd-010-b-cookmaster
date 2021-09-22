class UserService {
  constructor(model) {
    this.model = model;
    // methods
    this.insert = this.insert.bind(this);
  }

  async insert(data) {
    const res = await this.model.insert(data);
    return res;
  }
}

module.exports = UserService;