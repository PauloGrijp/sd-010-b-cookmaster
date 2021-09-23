class Recipe {
  constructor(db, ObjectId, serializer) {
    this.collection = db.collection('recipes');
    this.serializer = serializer;
    this.ObjectId = ObjectId;
    this.IdRgx = /^[a-fA-F0-9]{24}$/;
  }

  // isValidId(value) {
  //   return this.IdRgx.test(value);
  // }

  // async findBy(value) {
  //   const searchParam = Object.keys(value)[0];
  //   const searchValue = value[searchParam];

  //   let query;
  //   if (this.isValidId(value)) {
  //     query = { [searchParam]: this.ObjectId(searchValue) };
  //   } else {
  //     query = { [searchParam]: searchValue };
  //   }
  //   const user = await this.collection.findOne(query);
  //   return this.serializer.all(user);
  // }

  async insert(recipe) {
    const res = await this.collection.insertOne(recipe);
    return this.serializer.all(res.ops[0]);
  }
}

module.exports = Recipe;