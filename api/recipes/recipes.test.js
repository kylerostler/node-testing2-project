const request = require('supertest')
const db = require('../../data/db-config')
const server = require('../server')

const testRecipe = { recipe_id: 5, recipe_name: 'testing sandwich'}

const Recipes = require('../recipes/recipes-model')

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('recipes').truncate();
});

afterAll(async () => {
    await db.destroy();
});

test('sanity check', () => {
    expect(1).toBe(1);
});

test('correct env', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

test('[GET] /api/recipes/ will send all recipes', async () => {
    await Recipes.insert(testRecipe)

    let res;
    res = await request(server).get(`/api/recipes/`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ recipe_id: 5, recipe_name: 'testing sandwich'}])
})

test('[GET] /api/recipes/:recipe_id', async () => {
    await Recipes.insert(testRecipe)

    let res;
    res = await request(server).get(`/api/recipes/${5}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ recipe_id: 5, recipe_name: 'testing sandwich'}])
})