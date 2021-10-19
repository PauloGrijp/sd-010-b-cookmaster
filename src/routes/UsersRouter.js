const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/users', Controller.users.createItem);

module.exports = router;