export const getIngredientNames = (crepe, ingredients) => {
  return Object.keys(crepe.ingredients)
    .map(ingredientId => {
      const ingredientFound = ingredients.find(ingredient => {
        return ingredient.id === ingredientId;
      })

      return (ingredientFound !== undefined) ? ingredientFound.name : null;
    })
    .filter(value => value !== null);
}
