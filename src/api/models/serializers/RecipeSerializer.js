class RecipeSerializer {
  constructor() {
    this.id = null;
    this.name = null;
    this.ingredients = null;
    this.preparation = null;
    this.userId = null;
  }

  serialize({ _id, name, ingredients, preparation, userId }) {
    this.id = _id;
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;
  } 

  all(data) {
    if (!data) return null;
    this.serialize(data);
    return { 
      _id: this.id, 
      name: this.name, 
      ingredients: this.ingredients, 
      preparation: this.preparation, 
      userId: this.userId,
    };
  }
}

module.exports = new RecipeSerializer();