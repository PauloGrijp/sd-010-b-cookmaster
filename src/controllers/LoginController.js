const jwt = require('jsonwebtoken');
const LoginService = require('../services/LoginService');

const secret = 'chave-secreta';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // if (!email || !password)
  //   return res.status(401).json({ message: 'All fields must be filled' });

  // const user = await User.findEmail(email);

  // if (!user || user.password !== password)
  //   return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

  /* Criamos uma config básica para o nosso JWT, onde:
    expiresIn -> significa o tempo pelo qual esse token será válido;
    algorithm -> algoritmo que você usará para assinar sua mensagem
    (lembra que falamos do HMAC-SHA256 lá no começo?). */
  /* A propriedade expiresIn aceita o tempo de forma bem descritiva. Por exemplo: '7d' = 7 dias. '8h' = 8 horas. */
  
  const loginValidate = await LoginService.login(password, email);

  if (loginValidate.message) {
    return res.status(401).json({ message: loginValidate.message });
  }
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: loginValidate }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  loginUser,
};