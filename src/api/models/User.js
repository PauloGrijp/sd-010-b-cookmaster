const ConflictError = require('../middlewares/error/BaseError');
const { messages, statusCode } = require('../schemas');

class User {
  constructor(db, ObjectId, serializer) {
    this.collection = db.collection('users');
    this.serializer = serializer;
    this.ObjectId = ObjectId;
    this.IdRgx = /^[a-fA-F0-9]{24}$/;
  }

  isValidId(value) {
    return this.IdRgx.test(value);
  }

  async findBy(value) {
    const searchParam = Object.keys(value)[0];
    const searchValue = value[searchParam];

    let query;
    if (this.isValidId(value)) {
      query = { [searchParam]: this.ObjectId(searchValue) };
    } else {
      query = { [searchParam]: searchValue };
    }
    const user = await this.collection.findOne(query);
    return user;
  }

  async insert(data) {
    const foundUser = await this.findBy({ email: data.email });
    if (foundUser) throw new ConflictError(messages.EMAIL_CONFLICT, statusCode.CONFLICT);
    const res = await this.collection.insertOne(data);
    return this.serializer.default(res.ops[0]);
  }
}

module.exports = User;