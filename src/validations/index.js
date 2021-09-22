const errors = {
 campoObrigatorio: {
   message: 'Invalid entries. Try again.',
   code: 400,
 },
 emailRepetido: {
  message: 'Email already registered',
  code: 409,
 },
 campoLogin: {
  message: 'All fields must be filled',
  code: 401,
 },
 validacaoLogin: {
  message: 'Incorrect username or password',
  code: 401,
 },
};

const emailValido = (valor) => !valor.includes('@') || !valor.includes('.com'); 

const validacaoCampo = (valor) => !valor.name || !valor.email || !valor.password;

const validacaoCampoLogin = (valor) => !valor.email || !valor.password;

const validacaoPassword = (valor) => valor.length < 5;

const validacaoCadastramentoUsuario = (user, emailExiste) => {
  switch (true) {
    case validacaoCampo(user):
      return errors.campoObrigatorio;
    case emailExiste !== false:
      return errors.emailRepetido;
    case emailValido(user.email):
      return errors.campoObrigatorio;   
    default: return false;
  }
};

const validacaoLoginUsuario = (user, result) => {
  switch (true) {
    case validacaoCampoLogin(user):
      return errors.campoLogin;
    case emailValido(user.email):
      return errors.validacaoLogin;
    case validacaoPassword(user.password):
      return errors.validacaoLogin; 
    case result.length === 0:
      return errors.validacaoLogin;
    default: return false;
  }
};

module.exports = { 
  validacaoCadastramentoUsuario,
  validacaoLoginUsuario,
};
