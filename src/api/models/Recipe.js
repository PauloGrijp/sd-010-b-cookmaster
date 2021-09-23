class Recipe {
  constructor(db, ObjectId, serializer) {
    this.collection = db.collection('recipes');
    this.serializer = serializer;
    this.ObjectId = ObjectId;
    this.IdRgx = /^[a-fA-F0-9]{24}$/;

    this.isValidId = this.isValidId.bind(this);
  }

  isValidId(value) {
    return this.IdRgx.test(value);
  }

  async findBy(value) {
    const searchParam = Object.keys(value)[0];
    const searchValue = value[searchParam];
    let query;
    if (this.isValidId(searchValue)) {
      query = { [searchParam]: this.ObjectId(searchValue) };
    } else {
      query = { [searchParam]: searchValue };
    }
    const user = await this.collection.findOne(query);
    return this.serializer.all(user);
  }

  async getAll() {
    const recipeList = await this.collection.find().toArray();
    return recipeList.map((recipe) => this.serializer.all(recipe));
  }

  async insert(recipe) {
    const res = await this.collection.insertOne(recipe);
    return this.serializer.all(res.ops[0]);
  }

  async update({ id, recipe }) {
    const query = { _id: this.ObjectId(id) };
    const newValues = { $set: recipe };
    await this.collection.updateOne(query, newValues);
  }
}

module.exports = Recipe;