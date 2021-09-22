const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginControllers');

const { 
    emailAndPasswordExist,
    checkEmailAndPassword,

  } = require('../services/loginService');

router.post('/', emailAndPasswordExist, checkEmailAndPassword, loginController.loginUser); 

// app.use((err, req, res, _next) => 
// res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

module.exports = router;