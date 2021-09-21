const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, _next) => {
  // // Se for um erro do Joi, sabemos que trata-se de um erro de validação
  // if (err.isJoi) {
  //   // Logo, respondemos com o status 400 Bad Request
  //   return res.status(400)
  //     // E com a mensagem gerada pelo Joi
  //     .json({ err: { message: err.details[0].message } });
  // }

  // Caso não seja um erro do Joi, pode ser um erro de domínio ou um erro inesperado.
  // Construímos, então, um mapa que conecta um erro de domínio a um status HTTP.
  
  if (!err.codeError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.isErrorMessage });
  }
  
  let status = 500;

  switch (err.codeError) {
    case 'not_found':
      status = 404;
      break;
    // case 'invalid_data':
    //   status = 422;
    //   break;
    case 'bad_request':
      status = 400;
      break;
    case 'conflict':
      status = 409;
      break;
    default:
      break;
  }

  res.status(status).json({ message: err.isErrorMessage });
};
