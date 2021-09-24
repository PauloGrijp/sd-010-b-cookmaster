const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();
const { create, getRecipes, getRecipeID } = require('../controlers/recipes');

router.route('/')
    .post(
        middleware.validateJWT,
        middleware.verifyEntriesRecipes,
        create,
    )
    .get(
        getRecipes,
    );

router.route('/:id')
        .get(
            getRecipeID,
        );

module.exports = router;