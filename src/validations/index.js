const errors = {
 campoObrigatorio: {
   message: 'Invalid entries. Try again.',
   code: 400,
 },
 emailRepetido: {
  message: 'Email already registered',
  code: 409,
 },
};

const emailValido = (valor) => !valor.includes('@') || !valor.includes('.com'); 

const validacaoCampo = (valor) => !valor.name || !valor.email || !valor.password;

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

module.exports = { 
  validacaoCadastramentoUsuario,
};