const loginService = require('../services/loginService');
const auth = require('../auth/jwtFunctions');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService.validations({ email, password });

    if (result.erro) {
      return res.status(result.erro.code).json({ message: result.erro.message });
    }

    const token = auth.createJWT(result);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Deu ruim' });
  }
};

module.exports = { login };