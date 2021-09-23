class RecipeSerializer {
  constructor() {
    this.id = null;
    this.name = null;
    this.ingredients = null;
    this.preparation = null;
  }

  serialize({ _id, name, ingredients, preparation }) {
    this.id = _id;
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
  } 

  all(data) {
    this.serialize(data);
    return { 
      _id: this.id, 
      name: this.name, 
      ingredients: this.ingredients, 
      preparation: this.preparation, 
    };
  }
}

module.exports = new RecipeSerializer();