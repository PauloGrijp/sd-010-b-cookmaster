class User {
  constructor(db, ObjectId) {
    this.collection = db.collection('users');
    this.ObjectId = ObjectId;
  }

  async insert(data) {
    const res = await this.collection.insertOne(data);
    return res.ops[0];
  }
}

module.exports = User;