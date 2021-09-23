class Recipe {
  constructor(db, ObjectId, serializer) {
    this.collection = db.collection('recipes');
    this.serializer = serializer;
    this.ObjectId = ObjectId;
    this.IdRgx = /^[a-fA-F0-9]{24}$/;
  }

  async getAll() {
    const recipeList = await this.collection.find().toArray();
    return recipeList.map((recipe) => this.serializer.all(recipe));
  }

  async insert(recipe) {
    const res = await this.collection.insertOne(recipe);
    return this.serializer.all(res.ops[0]);
  }
}

module.exports = Recipe;