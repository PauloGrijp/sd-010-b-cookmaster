class RecipeSerializer {
  constructor() {
    this.id = null;
    this.name = null;
    this.ingredients = null;
    this.preparation = null;
    this.userId = null;
    this.image = null;
  }

  serialize({ _id, name, ingredients, preparation, userId, image }) {
    this.id = _id;
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;
    this.image = image;
  } 

  all(data) {
    if (!data) return null;
    this.serialize(data);
    const recipe = {      
      _id: this.id, 
      name: this.name, 
      ingredients: this.ingredients, 
      preparation: this.preparation, 
      userId: this.userId,
    };
    if (this.image) recipe.image = this.image;
    return recipe;
  }
}

module.exports = new RecipeSerializer();