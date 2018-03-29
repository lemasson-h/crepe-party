export const getIngredientNames = (crepe, ingredients) => {
  if (undefined === crepe.ingredients) {
    return [];
  }
  
  return Object.keys(crepe.ingredients)
    .map(ingredientId => {
      const ingredientFound = ingredients.find(ingredient => {
        return ingredient.id === ingredientId;
      })

      return (ingredientFound !== undefined) ? ingredientFound.name : null;
    })
    .filter(value => value !== null);
}

export const findCrepeById = (crepeId, crepes) => {
  return crepes.find(crepe => {
    return crepe.id === crepeId;
  });
}
