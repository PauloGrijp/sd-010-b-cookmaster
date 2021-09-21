// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Error
function ErrorRequest(name, message) {
  this.name = name;
  this.message = message || 'Erro interno';
  this.stack = (new Error()).stack;
}
ErrorRequest.prototype = Object.create(ErrorRequest.prototype);
ErrorRequest.prototype.constructor = ErrorRequest;

module.exports = ErrorRequest;
