const express = require('express');
const bodyParser = require('body-parser');

const userModel = require('../model/userModel');

const router = express.Router();
const STATUS_OK = {
    Created: 201,
};

const app = express();

router.post('/', async (req, res) => {
    const { name, email, role } = req.body;
    const userRegistered = await userModel.addUser(name, email, role);
    console.log(userRegistered, 'userRegistered Controller');
    
  return res.status(STATUS_OK.Created).json('ok');
  });

// Será necessário antes criar os middlewares (que será minha camada service)
// app.use((err, req, res, _next) => 
// res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

module.exports = router;