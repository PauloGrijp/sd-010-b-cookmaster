const jwt = require('jsonwebtoken');
const regexEmail = require('../helpers/regexEmail');
const { getUserByEmail } = require('../model/usersModel');

const segredo = 'hipersecrettoken';

// Comments: Lista de erros
const errors = {
  allFieldsFilled: 'All fields must be filled',
  incorrectUsernameOrPsw: 'Incorrect username or password',
  jwtMalformed: 'jwt malformed',
};

// Comments: Valida se o argumento EMAIL passado no body existe ou não é vazio.
const validateEmailToken = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(401).json({ message: errors.allFieldsFilled });
  }

  next();
};

// Comments: Valida se o argumento EMAIL passado no body tem o formato de e-mail correto.
const validateEmailFormatToken = async (req, res, next) => {
  const { email } = req.body;

  if (!regexEmail(email)) return res.status(401).json({ message: errors.incorrectUsernameOrPsw });

  next();
};

// Comments: Valida se o argumento PASSWORD passado no body existe ou não é vazio.
const validatePasswordToken = async (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(401).json({ message: errors.allFieldsFilled });
  }

  next();
};

// Comments: Valida se o argumento PASSWORD passado no body está no padrão.
const validatePasswordFormatToken = async (req, res, next) => {
  const { password } = req.body;

  if (password.length < 8) {
    return res.status(401).json({ message: errors.incorrectUsernameOrPsw });
  }

  next();
};

// Source: https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-jwt-json-web-token/acf1c24f-d531-4cf0-be9b-2384e37799d7/conteudos/096ab7ca-bfa4-41d2-9b14-fe5a42aa956c/implementando-jwt/e8ebbc5b-1a0d-4baa-97df-d355be493891?use_case=side_bar
const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  
  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, segredo);

    /*
      A variável decoded será um objeto semelhante ao seguinte:
      {
        email: 'erickjacquin@gmail.com',
        role: 'user',
        iat: 1632458690,
        exp: 1633063490
      }
    */

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
       por isso não é necessário fazer validação do tempo.
       Caso esteja tudo certo, nós então buscamos o usuário na base por EMAIL para obter seus dados atualizados */
    const user = await getUserByEmail(decoded.email);

    // Comments: O usuário existe! Colocamos ele em um campo no objeto req, dessa forma, o usuário estará disponível para outros middlewares que executem em sequência.
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: errors.jwtMalformed });
  }
};

module.exports = {
  validateEmailToken,
  validatePasswordToken,
  validateEmailFormatToken,
  validatePasswordFormatToken,
  validateJWT,
};
