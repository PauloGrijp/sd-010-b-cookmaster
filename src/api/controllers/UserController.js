class UserController {
  constructor(service) {
    this.service = service;

    this.insertData = this.insertData.bind(this);
  }

  async insertData(req, res) {
    const data = req.body;
    const result = await this.service.insert(data);
    return res.status(200).send(result);
  }
}

module.exports = UserController;