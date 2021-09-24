const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();
const { create, getRecipes } = require('../controlers/recipes');

router.route('/')
    .post(
        middleware.validateJWT,
        middleware.verifyEntriesRecipes,
        create,
    )
    .get(
        getRecipes,
    );

module.exports = router;