const router = require('express').Router()
const Recipe = require('./recipes-model')

router.get('/', (req, res, next) => {
    Recipe.getRecipes()
        .then(recipes => {
            res.status(200).json(recipes)
        })
        .catch(next)
})

router.get('/:recipe_id', (req, res, next) => {
    Recipe.getRecipeById(req.params.recipe_id)
        .then(recipe => {
            res.status(200).json(recipe)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        custom: 'something went wrong inside recipes-router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router