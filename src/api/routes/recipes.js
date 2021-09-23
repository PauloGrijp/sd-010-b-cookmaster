const express = require('express');
const middleware = require('../middlewares');

const router = express.Router();
const { create } = require('../controlers/recipes');

router.route('/')
    .post(
        middleware.validateJWT,
        middleware.verifyEntriesRecipes,
        create,
    );

module.exports = router;