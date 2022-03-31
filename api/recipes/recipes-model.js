const db = require('../../data/db-config')

async function getRecipeById(recipe_id) {
    const recipeRows = await db('recipes as r')
        .where('recipe_id', recipe_id)
    return recipeRows
}

async function insert(recipe) {
    const [id] = await db('recipes').insert(recipe);
    return getRecipeById(id);
  }

module.exports = { getRecipeById, insert }