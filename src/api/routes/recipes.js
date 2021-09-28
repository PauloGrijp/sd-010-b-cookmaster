const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();
const { create, getRecipes, getRecipeID, edit, remove } = require('../controlers/recipes');

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
        .get(getRecipeID)
        .put(
            middleware.validateJWT,
            middleware.validatePermissions,
            edit,
        )
        .delete(
            middleware.validateJWT,
            middleware.validatePermissions,
            remove,
        );

module.exports = router;